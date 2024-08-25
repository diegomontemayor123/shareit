import React from "react";
import RecipesScreen from "./RecipesScreen";
import { useState } from "react";

function UsersRecipesScreen({ navigation, route }: { navigation: any; route: any }) {
  const { userEmail } = route.params;
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };


  const filterUserRecipes = (recipes: any[]) => recipes.filter((recipe) => selectedCategory ? recipe.userEmail === userEmail && recipe.categoryId == selectedCategory.value : recipe.userEmail === userEmail);

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
