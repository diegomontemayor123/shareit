import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const simulateProgress = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 200); 
  });
};

export const addListing = async (listing, onUploadProgress,user) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("time", listing.time);
  data.append("categoryId", listing.category.value);
  data.append("categoryIcon", listing.category.icon)
  data.append("categoryColor", listing.category.backgroundColor)
  data.append("description", listing.description);
  data.append("userEmail", user.email)
  data.append("userName", user.name)

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: `image${index}`,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

    for (let progress = 0; progress <= 1; progress += 0.1) {
      await simulateProgress(); 
      onUploadProgress(progress);
    }
  
 
    return client.post(endpoint, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  export const deleteListing = (id) => client.delete(`${endpoint}/${id}`);


export default {
  addListing,
  getListings,
  deleteListing,
};
