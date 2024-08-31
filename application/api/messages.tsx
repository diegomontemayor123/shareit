import client from "./client";

const endpoint = "/messages";

const sendMessage = (message: string | null, recipeId: number, fromUserEmail: string, toUserEmail: string) =>
  client.post(endpoint, { message, recipeId, fromUserEmail, toUserEmail });

const getMessagesForUser = (user: any) =>
  client.get(endpoint, { user });

export const deleteMessage = (id: string) => client.delete(`${endpoint}/${id}`);

export default {
  sendMessage, getMessagesForUser, deleteMessage
};
