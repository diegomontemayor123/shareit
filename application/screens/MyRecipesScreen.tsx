import React from "react";
import Recipes from "./Recipes";
import useAuth from "../auth/useAuth";

function MyRecipesScreen({ navigation }: any) {
  const { user } = useAuth();

  const filterMyRecipes = (recipes: any[]) => {
    return recipes.filter((recipe) => recipe.userEmail === user.email);
  };

  return (
    <Recipes
      filterFn={filterMyRecipes}
      navigation={navigation}
      errorMessage="Could not retrieve your recipes."
      emptyMessage="You don't have any recipes yet."
    />
  );
}

export default MyRecipesScreen;
