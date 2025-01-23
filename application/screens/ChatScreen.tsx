import React, { useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import useAuth from '../auth/useAuth';
import messagesApi from "../api/messages";
import { Alert } from 'react-native';
import { View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import Avatar from '../components/Avatar';

const ChatScreen = ({ route }: any) => {
    const convo = route.params
    const navigation = useNavigation<any>();
    const { user } = useAuth()
    const formatMessagesForGiftedChat = (messages: any[]): IMessage[] => {
        return messages.map(message => ({
            _id: message.createdAt,
            text: message.text,
            createdAt: message.createdAt,
            user: {
                _id: message.user == user._id ? 1 : 2,
            },
            item: message.item,
        }))
    }
    const [messages, setMessages] = useState<IMessage[]>(formatMessagesForGiftedChat(convo.content));
    const onSend = async (newMessages: IMessage[] = []) => {
        setMessages(previousMessages => {
            return GiftedChat.append(previousMessages, newMessages)
        });
        const result = await messagesApi.sendMessage(newMessages[0].text, convo.fromUserId, convo.toUserId, null, null);
        if (!result.ok) {
            console.log("Error", result);
            return Alert.alert("Error", "Could not send the message.");
        }
    };

    const renderMessageText = (props: any) => {
        const { currentMessage } = props;
        const { text, item } = currentMessage;
        if (item) {

            return (
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ flex: 1 }}>{text}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RentalDetails", item)}
                        style={{ marginLeft: 10, alignItems: 'center' }}>
                        <Avatar
                            firstName={""}
                            lastName={""}
                            size={100}
                            imageUrl={item.images[0].url}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                        />
                        <Text style={{ padding: 7, fontWeight: "bold", textDecorationLine: 'underline', color: (currentMessage.user._id === 1 ? colors.white : colors.black) }}>{text}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return <Text style={{ padding: 7, color: (currentMessage.user._id === 1 ? colors.white : colors.black) }}>{text}</Text>;
    };

    return (
        <View style={{ flex: 1, paddingBottom: 35 }}>
            <GiftedChat
                messages={messages.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))}
                renderAvatar={null}
                onSend={onSend}
                renderMessageText={renderMessageText}
                user={{
                    _id: 1,
                }} /></View>);
};
export default ChatScreen;
