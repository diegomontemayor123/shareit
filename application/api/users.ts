import client from "./client";

interface UserInfo {
  name: string;
  phoneNumber: any
  email: string;
  password: string;
  images: string[]
  deleted?: any
}

const endpoint = "/users";


function formatPhoneNumber(phone: any) {
  const cleaned = phone?.replace(/\D/g, '') || ''
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } return phone;
}

const register = async (userInfo: UserInfo) => {
  const data = new FormData();
  data.append("name", userInfo.name);
  data.append("phoneNumber", formatPhoneNumber(userInfo.phoneNumber))
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

const editUser = async (userId: string, newUserInfo: UserInfo) => {
  const data = new FormData();
  data.append("name", newUserInfo.name);
  data.append("phoneNumber", formatPhoneNumber(newUserInfo.phoneNumber));
  data.append("email", newUserInfo.email);
  data.append("password", newUserInfo.password);

  if ('images' in newUserInfo) {
    newUserInfo.images.forEach((image, index) =>
      data.append("images", {
        name: `image${index}`,
        type: "image/jpeg",
        uri: image,
      } as any));
    data.append("deleted", "deleted")
  }
  return client.post(`${endpoint}/${userId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

const getUserbyId = async (_id: string) => {
  const result: any = await client.get(`${endpoint}?_id=${_id}`)
  return result.data
}

const getUserbyPhoneNumber = async (phoneNumber: string) => {
  const result: any = await client.get(`${endpoint}?phoneNumber=${phoneNumber}`)
  return result.data
}


const forgotPassword = (email: string) =>
  client.post(`${endpoint}/${email}/forgot-password`);

export {
  register, getUserbyId, getUserbyPhoneNumber, editUser, forgotPassword
};
