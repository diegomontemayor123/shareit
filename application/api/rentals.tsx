import client from "./client";

const endpoint = "/rentals";
const getRentals = () => client.get(endpoint);
const addRental = async (rental: any, onUploadProgress: any, user: any) => {

  const data = new FormData();
  data.append("title", rental.title);
  data.append("dailyPrice", rental.dailyPrice);
  data.append("categoryId", rental.category.value);
  data.append("categoryIcon", rental.category.icon)
  data.append("categoryColor", rental.category.backgroundColor)
  data.append("bookings", JSON.stringify(rental.bookings))
  data.append("description", rental.description);
  data.append("userId", user._id)
  data.append("likesCount", (rental.likesCount || 0).toString())
  data.append("likerIds", JSON.stringify(rental.likerIds || []))
  data.append("bookmarkIds", JSON.stringify(rental.bookmarkIds || []))

  rental.images.forEach((image: any, index: any) =>
    data.append("images", {
      name: `image${index}`, type: "image/jpeg", uri: image,
    } as any)
  );

  if (rental.location)
    data.append("location", JSON.stringify(rental.location));

  const simulateProgress = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  };
  for (let progress = 0; progress <= 1; progress += 0.1) {
    await simulateProgress();
    onUploadProgress(progress);
  } return client.post(endpoint, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
const editRental = async (rentalId: string, newRentalInfo: any, onUploadProgress: any,) => {
  const data = new FormData();
  data.append("title", newRentalInfo?.title || "");
  data.append("dailyPrice", newRentalInfo?.dailyPrice || "");
  data.append("categoryId", newRentalInfo.category?.value || "");
  data.append("categoryIcon", newRentalInfo.category?.icon || "")
  data.append("categoryColor", newRentalInfo.category?.backgroundColor || "")
  data.append("bookings", JSON.stringify(newRentalInfo?.bookings) || "")
  data.append("description", newRentalInfo?.description || "");

  if (newRentalInfo.images) {
    newRentalInfo.images.forEach((image: any, index: any) =>
      data.append("images", {
        name: `image${index}`, type: "image/jpeg", uri: image,
      } as any))
  }

  const simulateProgress = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  };
  for (let progress = 0; progress <= 1; progress += 0.1) {
    await simulateProgress();
    onUploadProgress(progress)
  }

  client.post(`${endpoint}/${rentalId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteRental = (id: string) => client.delete(`${endpoint}/${id}`);
const deleteComment = (id: number, commentId: string) => {
  return client.delete(`${endpoint}/${id}/comment/${commentId}`)
}

const addLike = (id: number, userId: string) =>
  client.post(`${endpoint}/${id}/like`, { userId });

const addComment = (id: number, userId: string, message: string) =>
  client.post(`${endpoint}/${id}/comment`, { userId, message });

const addBookmark = (id: number, userId: string) =>
  client.post(`${endpoint}/${id}/bookmark`, { userId });

export default {
  addRental,
  getRentals,
  deleteRental,
  addLike,
  editRental,
  addBookmark,
  addComment,
  deleteComment,
};
