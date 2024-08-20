import client from "./client";

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

const register = (userInfo: UserInfo) => client.post("/users", userInfo);

export default {
  register,
};
