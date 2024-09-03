import React from "react";
import RecipesScreen from "./RecipesScreen";
import { useState } from "react";

function UsersRecipesScreen({ navigation, route }: { navigation: any; route: any }) {
  const { userId } = route.params;
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };


  const filterUserRecipes = (recipes: any[]) => recipes.filter((recipe) => selectedCategory ? recipe.userId === userId && recipe.categoryId == selectedCategory.value : recipe.userId === userId);

  return (
    <RecipesScreen
      filterFn={filterUserRecipes}
      navigation={navigation}
      errorMessage="Could not retrieve the user's recipes."
      emptyMessage="This user has no recipes yet."
      onCategoryChange={handleCategoryChange}
    />
  );
}

export default UsersRecipesScreen;
