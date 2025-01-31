import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import UserEditScreen from "../screens/UserEditScreen";
import RentalDetailsScreen from "../screens/RentalDetailsScreen";
import UserGearScreen from "../screens/UserGearScreen";
import RentalEditScreen from "../screens/RentalEditScreen";
import SearchScreen from "../screens/SearchScreen";
import RentalAddScreen from "../screens/RentalAddScreen";
import BookingEditScreen from "../screens/BookingEditScreen";



const Stack = createStackNavigator();

const SearchNavigator: any = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="User Edit" component={UserEditScreen} />
    <Stack.Screen name="RentalDetails" component={RentalDetailsScreen} />
    <Stack.Screen name="Edit" component={RentalEditScreen} />
    <Stack.Screen name="Users Rentals" component={UserGearScreen} />
    <Stack.Screen name="Add" component={RentalAddScreen} />
    <Stack.Screen name="Booking Edit" component={BookingEditScreen} />
  </Stack.Navigator>
);

export default SearchNavigator;
