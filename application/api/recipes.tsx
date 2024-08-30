import client from "./client";

interface Recipe {
  title: string;
  time: string;
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
  likerEmails?: string[]
  userEmail: string;
  images: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface User {
  email: string;
  name: string;
}

type OnUploadProgress = (progress: number) => void;

const endpoint = "/recipes";
const getRecipes = () => client.get(endpoint);


export const addRecipe = async (
  recipe: Recipe,
  onUploadProgress: OnUploadProgress,
  user: User
) => {

  const data = new FormData();
  data.append("title", recipe.title);
  data.append("time", recipe.time);
  data.append("categoryId", recipe.category.value);
  data.append("categoryIcon", recipe.category.icon)
  data.append("categoryColor", recipe.category.backgroundColor)
  data.append("ingredients", recipe.ingredients)
  data.append("description", recipe.description);
  data.append("userEmail", user.email)
  data.append("userName", user.name)
  data.append("likesCount", (recipe.likesCount || 0).toString())
  data.append("likerEmails", JSON.stringify(recipe.likerEmails || []))

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

export const deleteRecipe = (id: string) => client.delete(`${endpoint}/${id}`);

export const addLike = (id: number, userEmail: string) =>
  client.post(`${endpoint}/${id}/like`, { userEmail });




export default {
  addRecipe,
  getRecipes,
  deleteRecipe,
  addLike
};
