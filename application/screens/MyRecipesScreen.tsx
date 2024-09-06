import React from "react";
import RecipesScreen from "./RecipesScreen";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "../components/lists";
import routes from "../navigation/routes";
import Avatar from "../components/Avatar";

function MyRecipesScreen({ navigation }: any) {
  const { user, logOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };
  const filterMyRecipes = (recipes: any[]) => {
    return recipes.filter((recipe) => selectedCategory ? recipe.userId === user._id && recipe.categoryId == selectedCategory.value : recipe.userId === user._id);
  };

  return (
    <>
      <ListItem
        title={user.name}
        icon1="account-edit"
        icon2="arrow-left-box"
        icon2Function={() => logOut()}
        subTitle="Edit User Info"
        onPress={() => navigation.navigate(routes.USER_EDIT)}
        IconComponent={
          <Avatar
            firstName={user.name.split(" ")[0]}
            lastName={user.name.split(" ")[1] || ""}
            size={40}
            imageUrl={user.images?.url || null}
            thumbnailUrl={user.images?.thumbnailUrl || null}
          />
        }
      />
      <RecipesScreen
        filterFn={filterMyRecipes}
        profilePage={true}
        navigation={navigation}
        errorMessage="Could not retrieve your recipes."
        emptyMessage="You don't have any recipes yet."
        onCategoryChange={handleCategoryChange}
      />
    </>
  );
}

export default MyRecipesScreen;
