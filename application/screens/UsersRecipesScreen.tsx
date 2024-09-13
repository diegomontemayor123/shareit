import React from "react";
import RecipesScreen from "./RecipesScreen";
import { useState, useEffect } from "react";
import { Entry } from "../components/entries";
import Avatar from "../components/Avatar";
import { getUserbyId, followUser } from "../api/users";
import messagesApi from '../api/messages'
import useAuth from "../auth/useAuth";
import { Alert } from "react-native";

function UsersRecipesScreen({ navigation, route }: { navigation: any; route: any }) {
  const { userId } = route.params;
  const [profileUser, setProfileUser] = useState<{ [_id: string]: any }>({});
  const { user } = useAuth()
  const [updatedUser, setUpdatedUser] = useState<{ [_id: string]: any }>({});
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };


  const fetchUser = async () => {
    const profileUserData = await getUserbyId(userId);
    const userData = await getUserbyId(user._id)
    setProfileUser(profileUserData);
    setUpdatedUser(userData)
  };

  useEffect(() => {
    fetchUser();
  }, [userId])

  const handleFollow = async (id: any) => {
    try {
      await followUser(user._id, id);
    } catch (error) {
      alert('Error following user.');
    }
  }

  const filterUserRecipes = (recipes: any[]) => recipes.filter((recipe) => selectedCategory ? recipe.userId === userId && recipe.categoryId == selectedCategory.value : recipe.userId === userId);
  return (
    <>
      <Entry
        title={profileUser.name}
        subTitle={""}
        icon1="email"
        onPress={
          async () => {
            const result = await messagesApi.sendMessage(null, user._id, profileUser._id, null) as any;
            if (!result.ok) {
              console.log('result' + JSON.stringify(result))
              return Alert.alert("Error", "Could not send the message.")
            }
            navigation.navigate(
              "Chat", { ...result.data } as any,
            )
          }}
        icon2={
          user._id != profileUser._id ? "plus-box-multiple-outline" : null}
        icon2Function={() => {
          handleFollow(profileUser._id)
          fetchUser()
        }}
        icon2Color={updatedUser.following &&
          updatedUser.following.includes(profileUser._id) ? "green" : null}
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
