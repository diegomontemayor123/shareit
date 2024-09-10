import React from "react";
import RecipesScreen from "./RecipesScreen";
import { useState, useEffect } from "react";
import { ListItem } from "../components/lists";
import Avatar from "../components/Avatar";
import { getUserbyId } from "../api/users";
import messagesApi from '../api/messages'
import useAuth from "../auth/useAuth";
import { Alert } from "react-native";

function UsersRecipesScreen({ navigation, route }: { navigation: any; route: any }) {
  const { userId } = route.params;
  const [profileUser, setProfileUser] = useState<{ [_id: string]: any }>({});
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserbyId(userId);
      setProfileUser(userData);
    };
    fetchUser();
  }, [userId])


  const filterUserRecipes = (recipes: any[]) => recipes.filter((recipe) => selectedCategory ? recipe.userId === userId && recipe.categoryId == selectedCategory.value : recipe.userId === userId);

  return (

    <>
      <ListItem
        title={profileUser.name}
        subTitle={""}
        icon1="email"
        onPress={
          async () => {
            const result = await messagesApi.sendMessage(null, user._id, profileUser._id) as any;
            console.log("Error", result);
            if (!result.ok) { return Alert.alert("Error", "Could not send the message.") }
            navigation.navigate(
              "Chat", { ...result.data } as any,
            )
          }}
        IconComponent={
          <Avatar
            firstName={profileUser.name ? profileUser.name.split(" ")[0] : ""}
            lastName={profileUser.name ? profileUser.name.split(" ")[1] || "" : ""}
            size={40}
            imageUrl={profileUser.images?.url || null}
            thumbnailUrl={profileUser.images?.thumbnailUrl || null}
          />
        }
      />
      <RecipesScreen
        filterFn={filterUserRecipes}
        profilePage={true}
        navigation={navigation}
        errorMessage="Could not retrieve the user's recipes."
        emptyMessage="This user has no recipes yet."
        onCategoryChange={handleCategoryChange}
      />
    </>
  );
}



export default UsersRecipesScreen;
