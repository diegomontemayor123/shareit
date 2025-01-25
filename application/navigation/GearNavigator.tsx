import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MyGearScreen from "../screens/MyGearScreen"
import UserEditScreen from "../screens/UserEditScreen";
import RentalDetailsScreen from "../screens/RentalDetailsScreen";
import UserGearScreen from "../screens/UserGearScreen";
import RentalEditScreen from "../screens/RentalEditScreen";



const Stack = createStackNavigator();

const GearNavigator: any = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyGear" component={MyGearScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="User Edit" component={UserEditScreen} />
    <Stack.Screen name="RentalDetails" component={RentalDetailsScreen} />
    <Stack.Screen name="Edit" component={RentalEditScreen} />
    <Stack.Screen name="Users Rentals" component={UserGearScreen} />
  </Stack.Navigator>
);

export default GearNavigator;
