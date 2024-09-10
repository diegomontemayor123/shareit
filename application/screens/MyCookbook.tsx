import React from "react";
import RecipesScreen from "./RecipesScreen";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { ListItem } from "../components/lists";
import Avatar from "../components/Avatar";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUserbyId } from "../api/users";

function MyCookBook({ navigation }: any) {
  const { user, logOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };
  const filterMyRecipes = (recipes: any[]) => {
    return recipes.filter((recipe) => selectedCategory ? recipe.bookmarkIds.includes(user._id) && recipe.categoryId == selectedCategory.value : recipe.bookmarkIds.includes(user._id));
  };
  const [profileUser, setProfileUser] = useState<any>(user)
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        const userData = await getUserbyId(user._id);
        setProfileUser(userData);
      };
      fetchUsers();
    }, [user._id])
  );

  return (
    <>
      <ListItem
        title={profileUser.name}
        icon1="account-edit"
        icon2="arrow-left-box"
        icon2Function={() => {
          Alert.alert("Log Out", "Are you sure you want to log out?", [
            {
              text: "Yes",
              onPress: logOut
            },
            { text: "Cancel" }
          ])
        }}
        subTitle="Edit User Info"
        onPress={() => navigation.navigate("User Edit")}
        IconComponent={
          <Avatar
            firstName={profileUser.name.split(" ")[0]}
            lastName={profileUser.name.split(" ")[1] || ""}
            size={40}
            imageUrl={profileUser.images?.url || null}
            thumbnailUrl={profileUser.images?.thumbnailUrl || null}
          />
        }
      />
      <RecipesScreen
        filterFn={filterMyRecipes}
        profilePage={true}
        navigation={navigation}
        errorMessage="Could not retrieve your recipes."
        emptyMessage="You don't have any bookmarked recipes."
        onCategoryChange={handleCategoryChange}
      />
    </>
  );
}

export default MyCookBook
