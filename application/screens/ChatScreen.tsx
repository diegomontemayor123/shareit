import React, { useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import useAuth from '../auth/useAuth';
import messagesApi from "../api/messages";
import { Alert } from 'react-native';
import { View } from 'react-native';

const ChatScreen = ({ route }: any) => {
    const convo = route.params
    console.log('convo' + JSON.stringify(convo))
    const { user } = useAuth()



    const formatMessagesForGiftedChat = (messages: any[]): IMessage[] => {
        return messages.map(message => ({
            _id: message.createdAt,
            text: message.text,
            createdAt: message.createdAt,
            user: {
                _id: message.user == user.email ? 1 : 2,
            },
        }))
    }

    const [messages, setMessages] = useState<IMessage[]>(formatMessagesForGiftedChat(convo.content));
    const onSend = async (newMessages: IMessage[] = []) => {
        setMessages(previousMessages => {
            return GiftedChat.append(previousMessages, newMessages)
        });
        const result = await messagesApi.sendMessage(newMessages[0].text, convo.recipeId, convo.fromUserEmail, convo.toUserEmail);
        if (!result.ok) {
            console.log("Error", result);
            return Alert.alert("Error", "Could not send the message.");
        }
    };

    return (
        <View style={{ flex: 1, paddingBottom: 25 }}>
            <GiftedChat
                messages={messages.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))}
                renderAvatar={() => null}
                onSend={onSend}
                user={{
                    _id: 1,
                }}


            />
        </View>
    );
};

export default ChatScreen;
