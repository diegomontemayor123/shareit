import client from "./client";

const endpoint = "/messages";

const send = (message: string, recipeId: number) =>
  client.post(endpoint, { message, recipeId });

export default {
  send,
};
