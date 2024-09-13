import client from "./client";

const endpoint = "/messages";

const sendMessage = (message: string | null, fromUserId: string, toUserId: string, item: any) =>
  client.post(endpoint, { message, fromUserId, toUserId, item });

const getMessagesForUser = (user: any) =>
  client.get(endpoint, { user });

export const deleteMessage = (id: string) => client.delete(`${endpoint}/${id}`);

export default {
  sendMessage, getMessagesForUser, deleteMessage
};
