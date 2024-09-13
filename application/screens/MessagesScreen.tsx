import React, { useState } from "react";
import { FlatList, View } from "react-native";
import Avatar from "../components/Avatar";
import Screen from "../components/Screen";
import { Entry, EntryDeleteAction, EntrySeparator } from "../components/entries";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import { useFocusEffect } from '@react-navigation/native';
import { getUserbyId } from "../api/users";
import colors from "../config/colors";
import AppText from "../components/AppText";
import Button from "../components/Button";

interface Message {
  _id: string;
  fromUserId: string;
  toUserId: string;
  recipeName: string;
  content: any
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
    <Screen style={{ backgroundColor: colors.light }}>

      {(getMessagesApi.error || messages ? messages.length === 0 : null) && (
        <View style={{ padding: 10 }}>
          <AppText style={{ marginVertical: 15 }}>{getMessagesApi.error ? "Could not retrieve user's messages." : "You have no messages."}</AppText>
          <Button title="Retry" onPress={() => {
            setRefreshing(true);
            fetchMessages();
            setRefreshing(false);
          }} />
        </View>
      )}
      <FlatList
        data={messages}
        keyExtractor={(message) => `${message._id}`}
        renderItem={({ item }) => {
          const _id = item.fromUserId === user._id ? item.toUserId : item.fromUserId;
          const displayUser = userDetails[_id] || { name: '', images: { url: null, thumbnailUrl: null } };

          return (
            <Entry
              title={displayUser.name}
              subTitle={item.content.text ? `${item.content[item.content.length - 1].text.substring(0, 30)}...` : null}
              IconComponent={
                <Avatar
                  firstName={displayUser.name.split(" ")[0]}
                  lastName={displayUser.name.split(" ")[1] || ""}
                  size={55}
                  imageUrl={displayUser.images?.url || null}
                  thumbnailUrl={displayUser.images?.thumbnailUrl || null}
                />
              }
              onPress={() => {
                navigation.navigate("Chat", item);
              }}
              renderRightActions={() => (
                <EntryDeleteAction onPress={() => handleDelete(item._id)} />
              )}
            />
          );
        }}
        ItemSeparatorComponent={EntrySeparator}
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
