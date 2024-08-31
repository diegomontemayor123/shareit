import client from "./client";

interface UserInfo {
  name: string;
  email: string;
  password: string;
  images: string[]
}


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

  return client.post("/users", data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default {
  register,
};
