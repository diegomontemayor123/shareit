import { useState, useEffect } from "react";
import recipesApi from "../api/recipes";

export default function useRecipeCount(userId: string) {
  const [recipeCount, setRecipeCount] = useState<number>(0);

  useEffect(() => {
    const fetchRecipeCount = async () => {
      const result = await recipesApi.getRecipes();

      const recipes = result.data as any;

      if (result.ok) {
        const userRecipes = recipes.filter((recipe: any) => recipe.userId === userId);
        setRecipeCount(userRecipes.length);
      } else {
        console.log("Failed to fetch recipe count");
      }
    };
    fetchRecipeCount();
  }, [userId]);

  return recipeCount;
}
