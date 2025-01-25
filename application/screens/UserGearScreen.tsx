import React from "react";
import RentalsScreen from "./RentalsScreen";
import { useState, useEffect } from "react";
import { Entry } from "../components/entries";
import Avatar from "../components/Avatar";
import { getUserbyId } from "../api/users";
import messagesApi from '../api/messages'
import useAuth from "../auth/useAuth";
import { Alert } from "react-native";

function UserGearScreen({ navigation, route }: { navigation: any; route: any }) {
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


  const filterUserGear = (rentals: any[]) => rentals.filter((rental) => selectedCategory ? rental.userId === userId && rental.categoryId == selectedCategory.value : rental.userId === userId);
  return (
    <>
      <Entry
        title={profileUser.name}
        subTitle={""}
        icon1="email"
        onPress={
          async () => {
            const result = await messagesApi.sendMessage(null, user._id, profileUser._id, null, null) as any;
            if (!result.ok) {

              return Alert.alert("Error", "Could not send the message.")
            }
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
      <RentalsScreen
        filterFn={filterUserGear}
        profilePage={true}
        navigation={navigation}
        errorMessage="Could not retrieve the user's gear."
        emptyMessage="This user has no gear yet."
        onCategoryChange={handleCategoryChange}
      />
    </>
  );
}



export default UserGearScreen;
