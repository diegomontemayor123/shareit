import client from "./client";


const login = (email: string, password: string) =>
  client.post("/auth", { email, password });

export default {
  login,
};
