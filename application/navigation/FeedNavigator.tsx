import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MyRentalsScreen from "../screens/MyRentalsScreen";
import UserEditScreen from "../screens/UserEditScreen";
import RentalDetailsScreen from "../screens/RentalDetailsScreen";
import UsersRentalsScreen from "../screens/UsersRentalsScreen";


const Stack = createStackNavigator();

const FeedNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>

    <Stack.Screen name="RentalDetails" component={RentalDetailsScreen} />
    <Stack.Screen name="Users Rentals" component={UsersRentalsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
