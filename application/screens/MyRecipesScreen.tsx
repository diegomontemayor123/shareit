import React from "react";
import RecipesScreen from "./RecipesScreen";
import useAuth from "../auth/useAuth";

function MyRecipesScreen({ navigation }: any) {
  const { user } = useAuth();

  const filterMyRecipes = (recipes: any[]) => {
    return recipes.filter((recipe) => recipe.userEmail === user.email);
  };

  return (
    <RecipesScreen
      filterFn={filterMyRecipes}
      navigation={navigation}
      errorMessage="Could not retrieve your recipes."
      emptyMessage="You don't have any recipes yet."
    />
  );
}

export default MyRecipesScreen;
