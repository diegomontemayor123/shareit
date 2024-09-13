import React, { useState } from "react";
import RecipesScreen from "./RecipesScreen";
import useAuth from "../auth/useAuth";
import { Entry, EntrySeparator } from "../components/entries";
import Avatar from "../components/Avatar";
import { Alert, Modal, View, TouchableWithoutFeedback, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUserbyId, followUser } from "../api/users";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
function MyRecipesScreen({ navigation, isMyRecipes = true }: any) {
  const { user, logOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showFollow, setShowFollow] = useState<any>(false)
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const [profileUser, setProfileUser] = useState<any>(user)
  const fetchUserIds = async () => {
    const userIds = new Set<string>();
    profileUser.following.forEach((follow: any) => {
      userIds.add(follow);
    });
    const details: { [key: string]: any } = {};
    for (const _id of userIds) {
      const userData = await getUserbyId(_id);
      details[_id] = userData;
    }
    setUserDetails(details);
  };

  const handleFollow = async (id: any) => {
    try {
      await followUser(profileUser._id, id);
      fetchUsers()
    } catch (error) {
      alert('Error following user.');
    }
  }


  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };
  const filterMyRecipes = (recipes: any[]) => {
    return recipes.filter((recipe) => selectedCategory ?
      (isMyRecipes ? recipe.userId === user._id : recipe.bookmarkIds.includes(user._id)) && recipe.categoryId == selectedCategory.value
      : (isMyRecipes ? recipe.userId === user._id : recipe.bookmarkIds.includes(user._id)));
  };


  const fetchUsers = async () => {
    const userData = await getUserbyId(user._id);
    setProfileUser(userData);
  };

  useFocusEffect(
    React.useCallback(() => {

      fetchUsers();
    }, [user._id])
  );

  return (
    <>
      <Entry
        title={profileUser.name}
        icon1="account-edit"
        icon3="arrow-left-box"
        icon3Function={() => {
          Alert.alert("Log Out", "Are you sure you want to log out?", [
            {
              text: "Yes",
              onPress: logOut
            },
            { text: "Cancel" }
          ])
        }}
        icon2="plus-box-multiple-outline"
        icon2Function={() => {
          fetchUserIds()
          setShowFollow(true)
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
        filterFn={filterMyRecipes} onCategoryChange={handleCategoryChange}
        profilePage={true} navigation={navigation}
        errorMessage={"Could not retrieve your recipes."}
        emptyMessage={isMyRecipes ? "You don't have any recipes yet." : "You don't have any bookmarked recipes."}
      />

      <Modal visible={showFollow} animationType="slide"><Screen>
        <View style={{ padding: 15 }}>
          <TouchableWithoutFeedback onPress={() => setShowFollow(false)}>
            <MaterialCommunityIcons name="close" size={30} />
          </TouchableWithoutFeedback></View>
        {Object.keys(userDetails).length > 0 ?
          <FlatList data={Object.values(userDetails)}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <Entry
                  title={item.name}
                  icon2={item._id != user._id ? "plus-box-multiple-outline" : null}
                  icon2Function={() => {
                    handleFollow(item._id)
                  }}
                  icon2Color={profileUser.following &&
                    profileUser.following.includes(item._id) ? "green" : null}
                  subTitle={item.message}
                  onPress={() => {
                    navigation.navigate(
                      'Users Recipes',
                      { userId: item._id },
                    );
                    setShowFollow(false)
                  }}
                  IconComponent={
                    <Avatar
                      firstName={item.name.split(" ")[0]}
                      lastName={item.name.split(" ")[1] || ""}
                      size={55}
                      imageUrl={item.images?.url || null}
                      thumbnailUrl={item.images?.thumbnailUrl || null}
                    />} />);
            }}
            ItemSeparatorComponent={EntrySeparator}
          />
          : <AppText style={{ padding: 15 }}>You are not currently following any users.</AppText>}
      </Screen></Modal>
    </>
  );
}

export default MyRecipesScreen;
