import apiClient from "./client";

const register = (pushToken: string) =>
  apiClient.post("/expoPushTokens", { token: pushToken });

export default {
  register,
};
