import client from "./client";

const endpoint = "/messages";

const sendMessage = (message: string | null, recipeId: number, fromUserId: string, toUserId: string) =>
  client.post(endpoint, { message, recipeId, fromUserId, toUserId });

const getMessagesForUser = (user: any) =>
  client.get(endpoint, { user });

export const deleteMessage = (id: string) => client.delete(`${endpoint}/${id}`);

export default {
  sendMessage, getMessagesForUser, deleteMessage
};
