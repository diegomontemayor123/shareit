import client from "./client";

interface UserInfo {
  name: string;
  phoneNumber: any
  email: string;
  password: string;
  images: string[]
  following?: string[]
}

const endpoint = "/users";

const register = async (userInfo: UserInfo) => {
  const data = new FormData();
  data.append("name", userInfo.name);
  data.append("phoneNumber", userInfo.phoneNumber)
  data.append("email", userInfo.email);
  data.append("password", userInfo.password);
  data.append("following", JSON.stringify(userInfo.following || []))

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

const editUser = async (userId: string, newUserInfo: UserInfo) => {
  const data = new FormData();
  data.append("name", newUserInfo.name);
  data.append("phoneNumber", newUserInfo.phoneNumber);
  data.append("email", newUserInfo.email);
  data.append("password", newUserInfo.password);

  if (newUserInfo.images) {
    newUserInfo.images.forEach((image, index) =>
      data.append("images", {
        name: `image${index}`,
        type: "image/jpeg",
        uri: image,
      } as any)
    );
  }

  return client.post(`${endpoint}/${userId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};


const getUserbyId = async (_id: string) => {
  const result: any = await client.get(`${endpoint}?_id=${_id}`)
  return result.data
}

const followUser = (id: number, userId: string) =>
  client.post(`${endpoint}/${id}/follow`, { userId });

const forgotPassword = (email: string) =>
  client.post(`${endpoint}/${email}/forgot-password`);

export {
  register, getUserbyId, editUser, followUser, forgotPassword
};
