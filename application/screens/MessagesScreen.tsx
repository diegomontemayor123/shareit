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
import { getUserbyId } from "../api/users";

interface Message {
  _id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  recipeName: string;
  content: string;
  recipeId: string;
}

interface User {
  email: string;
  name: string;
  _id: string
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
    const result = await getMessagesApi.request(user._id);

    if (result.ok) {
      const sortedMessages = result.data.sort((a: any, b: any) =>
        Math.max(...b.content.map((c: any) => c.createdAt)) - Math.max(...a.content.map((c: any) => c.createdAt))
      );
      setMessages(sortedMessages);

      const userIds = new Set<string>();
      sortedMessages.forEach((message: Message) => {
        userIds.add(message.fromUserId);
        userIds.add(message.toUserId);
      });

      const details: { [key: string]: User } = {};
      for (const _id of userIds) {
        const userData = await getUserbyId(_id);
        details[_id] = userData;
      }
      setUserDetails(details);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();

    }, [messages])
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
        keyExtractor={(message) => `${message.fromUserId}-${message.recipeId}`}
        renderItem={({ item }) => {
          const _id = item.fromUserId === user.email ? item.toUserId : item.fromUserId;
          const displayName = _id === item.fromUserId ? item.fromUserName : item.toUserName;
          const displayUser = userDetails[_id] || { images: { url: null, thumbnailUrl: null } };

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
