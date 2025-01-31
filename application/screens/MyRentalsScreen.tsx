import React, { useState } from "react";
import RentalsScreen from "./RentalsScreen";
import useAuth from "../auth/useAuth";
import { Entry } from "../components/entries";
import Avatar from "../components/Avatar";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUserbyId } from "../api/users";

function MyRentalsScreen({ navigation }: any) {
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
  const filterMyRentals = (rentals: any[]) => {
    return rentals.filter((rental) => {
      const bookings = JSON.parse(rental.bookings);
      const isUserInBookings = bookings?.some((booking: any) => booking.userId === user._id);
      return selectedCategory
        ? isUserInBookings && rental.categoryId == selectedCategory.value
        : isUserInBookings;
    });
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
          />} />
      <RentalsScreen
        filterFn={filterMyRentals}
        onCategoryChange={handleCategoryChange}
        profilePage={false} navigation={navigation}
        errorMessage={"Could not retrieve your rentals."}
        emptyMessage={"You don't have any rentals booked yet."}
      />
    </>
  );
}

export default MyRentalsScreen;
