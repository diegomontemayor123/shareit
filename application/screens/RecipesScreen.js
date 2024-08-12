import React from "react";
import Recipes from "./Recipes";

function RecipesScreen({ navigation }) {
  const filterAllRecipes = (recipes) => recipes;

  return (
    <Recipes
      filterFn={filterAllRecipes}
      navigation={navigation}
      errorMessage="Couldn't retrieve the recipes."
      emptyMessage="No recipes available."
    />
  );
}

export default RecipesScreen;
