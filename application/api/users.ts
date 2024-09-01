import client from "./client";

interface UserInfo {
  name: string;
  email: string;
  password: string;
  images: string[]
}

const endpoint = "/users";

const register = async (userInfo: UserInfo) => {
  const data = new FormData();
  data.append("name", userInfo.name);
  data.append("email", userInfo.email);
  data.append("password", userInfo.password);

  if (userInfo.images) {
    userInfo.images.forEach((image, index) =>
      data.append("images", {
        name: `image${index}`,
        type: "image/jpeg",
        uri: image,
      } as any)
    );
  }

  return client.post(endpoint, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
const getUserbyEmail = async (email: string) => {
  const result: any = await client.get(`${endpoint}?email=${email}`)
  return result.data
}

const getUserbyId = async (_id: string) => {
  const result: any = await client.get(`${endpoint}?_id=${_id}`)
  return result.data
}

export {
  register, getUserbyEmail, getUserbyId
};
