import React, { useState } from "react";
import { FlatList } from "react-native";
import Avatar from "../components/Avatar";
import Screen from "../components/Screen";
import { ListItem, ListItemDeleteAction, ListItemSeparator } from "../components/lists";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import { useFocusEffect } from '@react-navigation/native';
import { getUserbyEmail } from "../api/users";

interface Message {
  _id: string;
  fromUserEmail: string;
  fromUserName: string;
  toUserEmail: string;
  toUserName: string;
  recipeName: string;
  content: string;
  recipeId: string;
}

interface User {
  email: string;
  name: string;
  images: {
    url: string;
    thumbnailUrl: string;
  };
}

function MessagesScreen({ navigation }: any) {
  const { user } = useAuth();
  const getMessagesApi = useApi(messagesApi.getMessagesForUser);

  const [messages, setMessages] = useState<Message[]>([]);
  const [userDetails, setUserDetails] = useState<{ [key: string]: User }>({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = async () => {
    const result = await getMessagesApi.request(user.email);

    if (result.ok) {
      const sortedMessages = result.data.sort((a: any, b: any) =>
        Math.max(...b.content.map((c: any) => c.createdAt)) - Math.max(...a.content.map((c: any) => c.createdAt))
      );
      setMessages(sortedMessages);

      const userEmails = new Set<string>();
      sortedMessages.forEach((message: Message) => {
        userEmails.add(message.fromUserEmail);
        userEmails.add(message.toUserEmail);
      });

      const details: { [key: string]: User } = {};
      for (const email of userEmails) {
        const userData = await getUserbyEmail(email);
        details[email] = userData;
      }
      setUserDetails(details);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();

    }, [])
  );

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
        keyExtractor={(message) => `${message.fromUserEmail}-${message.recipeId}`}
        renderItem={({ item }) => {
          const email = item.fromUserEmail === user.email ? item.toUserEmail : item.fromUserEmail;
          const displayName = email === item.fromUserEmail ? item.fromUserName : item.toUserName;
          const displayUser = userDetails[email] || { images: { url: null, thumbnailUrl: null } };

          return (
            <ListItem
              title={displayName}
              subTitle={`${item.recipeName} Recipe`}
              IconComponent={
                <Avatar
                  firstName={displayName.split(" ")[0]}
                  lastName={displayName.split(" ")[1] || ""}
                  size={55}
                  imageUrl={displayUser.images?.url || null}
                  thumbnailUrl={displayUser.images?.thumbnailUrl || null}
                />
              }
              onPress={() => {
                navigation.navigate(routes.CHATSCREEN, item);
              }}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item._id)} />
              )}
            />
          );
        }}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchMessages();
          setRefreshing(false);
        }}
      />
    </Screen>
  );
}

export default MessagesScreen;
