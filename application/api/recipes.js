import client from "./client";

const endpoint = "/recipes";

const getRecipes = () => client.get(endpoint);

const simulateProgress = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 200); 
  });
};

export const addRecipe = async (recipe, onUploadProgress,user) => {
  const data = new FormData();
  data.append("title", recipe.title);
  data.append("time", recipe.time);
  data.append("categoryId", recipe.category.value);
  data.append("categoryIcon", recipe.category.icon)
  data.append("categoryColor", recipe.category.backgroundColor)
  data.append("description", recipe.description);
  data.append("userEmail", user.email)
  data.append("userName", user.name)
  data.append("likesCount", recipe.likesCount || Number(0))

  recipe.images.forEach((image, index) =>
    data.append("images", {
      name: `image${index}`,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (recipe.location)
    data.append("location", JSON.stringify(recipe.location));

    for (let progress = 0; progress <= 1; progress += 0.1) {
      await simulateProgress(); 
      onUploadProgress(progress);
    }
  
 
    return client.post(endpoint, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  export const deleteRecipe = (id) => client.delete(`${endpoint}/${id}`);

  export const addLike = (id) => client.post(`${endpoint}/${id}/like`);
  
  


export default {
  addRecipe,
  getRecipes,
  deleteRecipe,
  addLike
};
