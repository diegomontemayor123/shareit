import React from "react";
import RecipesScreen from "./RecipesScreen";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "../components/lists";
import routes from "../navigation/routes";
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
      <View style={styles.container}>
        <ListItem
          title={profileUser.name}
          subTitle={"Message " + profileUser.name}
          onPress={
            async () => {
              const result = await messagesApi.sendMessage(null, user._id, profileUser._id) as any;
              console.log("Error", result);
              if (!result.ok) { return Alert.alert("Error", "Could not send the message.") }
              navigation.navigate('Profile', {
                screen: routes.CHATSCREEN, params: { ...result.data } as any,
              })
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
      </View>
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

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
  },
});

export default UsersRecipesScreen;
