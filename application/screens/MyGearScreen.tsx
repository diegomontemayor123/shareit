import React, { useState } from "react";
import RentalsScreen from "./RentalsScreen";
import useAuth from "../auth/useAuth";
import { Entry } from "../components/entries";
import Avatar from "../components/Avatar";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUserbyId } from "../api/users";

import AppText from "../components/AppText";
import colors from "../config/colors";
function MyGearScreen({ navigation, isMyGear = true }: any) {
  const { user, logOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [profileUser, setProfileUser] = useState<any>(user)

  const fetchUser = async () => {
    const userData = await getUserbyId(user._id);
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
      fetchUser();
    }, [user._id])
  );

  return (
    <>

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
