import React from "react";
import Recipes from "./Recipes";

function UsersRecipesScreen({ navigation, route }) {
  const { userEmail } = route.params;
 

  const filterUserRecipes = (recipes) => {
    return recipes.filter((recipe) => recipe.userEmail === userEmail);
  };

  return (
    <Recipes
      filterFn={filterUserRecipes}
      navigation={navigation}
      errorMessage="Could not retrieve the user's recipes."
      emptyMessage="This user has no recipes yet."
    />
  );
}

export default UsersRecipesScreen;
