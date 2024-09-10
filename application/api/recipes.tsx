import client from "./client";

interface Recipe {
  title: string;
  timeToComplete: string;
  category: {
    value: string;
    icon: string;
    backgroundColor: string;
  };
  ingredients: string
  description: string;
  user: {
    email: string;
    name: string;
  };
  likesCount?: number;
  likerIds?: string[]
  bookmarkIds?: string[]
  images: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface User {
  email: string;
  name: string;
  _id: string
}

type OnUploadProgress = (progress: number) => void;

const endpoint = "/recipes";
const getRecipes = () => client.get(endpoint);


const addRecipe = async (
  recipe: Recipe,
  onUploadProgress: OnUploadProgress,
  user: User
) => {

  const data = new FormData();
  data.append("title", recipe.title);
  data.append("timeToComplete", recipe.timeToComplete);
  data.append("categoryId", recipe.category.value);
  data.append("categoryIcon", recipe.category.icon)
  data.append("categoryColor", recipe.category.backgroundColor)
  data.append("ingredients", recipe.ingredients)
  data.append("description", recipe.description);
  data.append("userId", user._id)
  data.append("likesCount", (recipe.likesCount || 0).toString())
  data.append("likerIds", JSON.stringify(recipe.likerIds || []))
  data.append("bookmarkIds", JSON.stringify(recipe.bookmarkIds || []))

  recipe.images.forEach((image, index) =>
    data.append("images", {
      name: `image${index}`,
      type: "image/jpeg",
      uri: image,
    } as any)
  );

  if (recipe.location)
    data.append("location", JSON.stringify(recipe.location));

  const simulateProgress = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  };
  for (let progress = 0; progress <= 1; progress += 0.1) {
    await simulateProgress();
    onUploadProgress(progress);
  }

  return client.post(endpoint, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const editRecipe = async (recipeId: string, newRecipeInfo: Recipe, onUploadProgress: OnUploadProgress,) => {
  const data = new FormData();
  data.append("title", newRecipeInfo.title);
  data.append("timeToComplete", newRecipeInfo.timeToComplete);
  data.append("categoryId", newRecipeInfo.category.value == null ? "" : newRecipeInfo.category.value);
  data.append("categoryIcon", newRecipeInfo.category.icon == null ? "" : newRecipeInfo.category.icon)
  data.append("categoryColor", newRecipeInfo.category.backgroundColor == null ? "" : newRecipeInfo.category.backgroundColor)
  data.append("ingredients", newRecipeInfo.ingredients)
  data.append("description", newRecipeInfo.description);

  if (newRecipeInfo.images) {
    newRecipeInfo.images.forEach((image, index) =>
      data.append("images", {
        name: `image${index}`,
        type: "image/jpeg",
        uri: image,
      } as any)
    );
  }

  const simulateProgress = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  };
  for (let progress = 0; progress <= 1; progress += 0.1) {
    await simulateProgress();
    onUploadProgress(progress);
  }

  client.post(`${endpoint}/${recipeId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};


const deleteRecipe = (id: string) => client.delete(`${endpoint}/${id}`);

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
  addRecipe,
  getRecipes,
  deleteRecipe,
  addLike,
  editRecipe,
  addBookmark,
  addComment,
  deleteComment,
};
