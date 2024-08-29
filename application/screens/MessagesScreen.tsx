import React, { useState } from "react";
import { FlatList } from "react-native";
import InitialsAvatar from "../components/InitialsAvatar";
import Screen from "../components/Screen";
import { ListItem, ListItemDeleteAction, ListItemSeparator } from "../components/lists";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import { useFocusEffect } from '@react-navigation/native';

interface Message {
  _id: string;
  fromUser: { name: string; email: string };
  recipeName: string;
  content: string;
  recipeId: string
}

function MessagesScreen({ navigation }: any) {
  const { user } = useAuth()
  const getMessagesApi = useApi(messagesApi.getMessagesForUser)

  const fetchMessages = async () => {
    const result = await getMessagesApi.request(user.email)
    if (result.ok) {
      setMessages(result.data)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();
    }, [user.email])
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = async (_id: string) => {
    try {
      const result = await messagesApi.deleteMessage(_id);
      if (!result.ok) {
        alert("Could not delete message.");
        return;
      }
      setMessages(messages.filter(message => message._id !== _id));
    } catch (error) {
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => `${message.fromUser}-${message.recipeId}`}
        renderItem={({ item }) => (
          <ListItem
            title={item.fromUser.name}
            subTitle={item.recipeName + " Recipe"}
            IconComponent={
              <InitialsAvatar
                firstName={item.fromUser.name.split(" ")[0]}
                lastName={item.fromUser.name.split(" ")[1] || ""}
                size={55}
              />
            }
            onPress={() => {
              //console.log('item' + JSON.stringify(item))
              navigation.navigate(routes.CHATSCREEN, item)
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item._id)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true)
          fetchMessages()
          setRefreshing(false)
        }} /></Screen>
  )
}

export default MessagesScreen;
