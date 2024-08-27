import client from "./client";

const endpoint = "/messages";

const sendMessage = (message: string, recipeId: number) =>
  client.post(endpoint, { message, recipeId });

const getMessagesForUser = (user: any) =>
  client.get(endpoint, { user });

export default {
  sendMessage, getMessagesForUser
};
