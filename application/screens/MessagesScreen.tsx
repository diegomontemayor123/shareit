import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import InitialsAvatar from "../components/InitialsAvatar";
import Screen from "../components/Screen";
import { ListItem, ListItemDeleteAction, ListItemSeparator } from "../components/lists";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

function MessagesScreen(props: any) {
  const { user } = useAuth()
  const getMessagesApi = useApi(messagesApi.getMessagesForUser)

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getMessagesApi.request(user.email)
      if (result.ok) setMessages(result.data)
    }
    fetchMessages()
  }, [user.email])

  const [messages, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message: any) => {
    //setMessages(messages.filter((m) => m.ObjectId !== message.ObjectId));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.ObjectId}
        renderItem={({ item }) => (
          <ListItem
            title={item.fromUser.name}
            subTitle={item.content}
            IconComponent={
              <InitialsAvatar
                firstName={item.fromUser.name.split(" ")[0]}
                lastName={item.fromUser.name.split(" ")[1] || ""}
                size={55}
              />
            }
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true)
          //Need to call new messages
          setRefreshing(false)
        }} /></Screen>
  )
}

export default MessagesScreen;
