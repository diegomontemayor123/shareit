import React from "react";
import RecipesScreen from "./RecipesScreen";

function AllRecipesScreen({ navigation }: { navigation: any }) {

  const filterAllRecipes = (recipe: any[]) => recipe;

  return (
    <RecipesScreen
      filterFn={filterAllRecipes}
      navigation={navigation}
      errorMessage="Couldn't retrieve the recipes."
      emptyMessage="No recipes available."
    />
  );
}

export default AllRecipesScreen;
