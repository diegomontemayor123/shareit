import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MyRentalsScreen from "../screens/MyRentalsScreen";
import UserEditScreen from "../screens/UserEditScreen";
import RentalDetailsScreen from "../screens/RentalDetailsScreen";
import UsersRentalsScreen from "../screens/UsersRentalsScreen";
import RentalEditScreen from "../screens/RentalEditScreen";



const Stack = createStackNavigator();

const ProfileNavigator: any = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyRentals" component={MyRentalsScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="User Edit" component={UserEditScreen} />
    <Stack.Screen name="RentalDetails" component={RentalDetailsScreen} />
    <Stack.Screen name="Edit" component={RentalEditScreen} />
    <Stack.Screen name="Users Rentals" component={UsersRentalsScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
