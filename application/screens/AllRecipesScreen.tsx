import React from "react";
import RecipesScreen from "./RecipesScreen";
import { useState } from "react";

function AllRecipesScreen({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };


  const filterAllRecipes = (recipes: any[]) => {

    return recipes.filter((recipe) => selectedCategory ? recipe.categoryId == selectedCategory.value : recipe)
  }


  return (
    <RecipesScreen
      filterFn={filterAllRecipes}
      navigation={navigation}
      errorMessage="Couldn't retrieve the recipes."
      emptyMessage="No recipes available."
      onCategoryChange={handleCategoryChange}
    />
  );
}

export default AllRecipesScreen;
