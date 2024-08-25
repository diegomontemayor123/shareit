import React from "react";
import RecipesScreen from "./RecipesScreen";
import useAuth from "../auth/useAuth";
import { useState } from "react";

function MyRecipesScreen({ navigation }: any) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };


  const filterMyRecipes = (recipes: any[]) => {
    return recipes.filter((recipe) => selectedCategory ? recipe.userEmail === user.email && recipe.categoryId == selectedCategory.value : recipe.userEmail === user.email);
  };

  return (
    <RecipesScreen
      filterFn={filterMyRecipes}
      navigation={navigation}
      errorMessage="Could not retrieve your recipes."
      emptyMessage="You don't have any recipes yet."
      onCategoryChange={handleCategoryChange}
    />
  );
}

export default MyRecipesScreen;
