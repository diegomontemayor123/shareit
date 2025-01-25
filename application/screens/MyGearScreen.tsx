import React, { useState } from "react";
import RentalsScreen from "./RentalsScreen";
import useAuth from "../auth/useAuth";
import { Entry, EntrySeparator } from "../components/entries";
import Avatar from "../components/Avatar";
import { Alert, Modal, View, TouchableWithoutFeedback, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUserbyId, followUser } from "../api/users";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
function MyGearScreen({ navigation, isMyGear = true }: any) {
  const { user, logOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const [profileUser, setProfileUser] = useState<any>(user)

  const fetchUserIds = async () => {
    const userIds = new Set<string>();
    profileUser.following?.forEach((follow: any) => {
      userIds.add(follow);
    });
    const usersData: { [key: string]: any } = {};
    for (const _id of userIds) {
      const userData = await getUserbyId(_id);
      usersData[_id] = userData;
    }
    const userData = await getUserbyId(user._id);
    setUserDetails(usersData);
    setProfileUser(userData)
  };


  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };
  const filterMyGear = (rentals: any[]) => {
    return rentals.filter((rental) => selectedCategory ?
      (isMyGear ? rental.userId === user._id : rental.bookmarkIds.includes(user._id)) && rental.categoryId == selectedCategory.value
      : (isMyGear ? rental.userId === user._id : rental.bookmarkIds.includes(user._id)));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserIds();
    }, [user._id])
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('Contacts Screen')

      }
      }>
        <AppText style={{ fontWeight: 'bold', color: colors.primary }}>See who else is using ShareIt</AppText>
      </TouchableWithoutFeedback>
      <Entry
        title={profileUser.name}
        icon1=""
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
        icon2Function={() => navigation.navigate("Add")}
        subTitle="Edit User Info"
        onPress={() => navigation.navigate("User Edit")}
        IconComponent={

          <Avatar
            firstName={profileUser.name?.split(" ")[0] || ""}
            lastName={profileUser.name?.split(" ")[1] || ""}
            size={40}
            imageUrl={profileUser.images?.url || null}
            thumbnailUrl={profileUser.images?.thumbnailUrl || null}
          />
        }
      />

      <RentalsScreen
        filterFn={filterMyGear} onCategoryChange={handleCategoryChange}
        profilePage={true} navigation={navigation}
        errorMessage={"Could not retrieve your rentals."}
        emptyMessage={isMyGear ? "You don't have any gear yet." : "You don't have any gear saved yet."}
      />


    </>
  );
}

export default MyGearScreen;
