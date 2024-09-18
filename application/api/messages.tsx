import client from "./client";

const endpoint = "/messages";

const sendMessage = async (message: string | null, fromUserId: string, toUserId: string, item: any, read: any) => {
  const result = await client.post(endpoint, { message, fromUserId, toUserId, item, read });
  return result
}

const getMessagesForUser = (user: any) =>
  client.get(endpoint, { user });

export const deleteMessage = (id: string) => client.delete(`${endpoint}/${id}`);

export default {
  sendMessage, getMessagesForUser, deleteMessage
};
