import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import UsersListingsScreen from "../screens/UsersListingsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="My Listings" component={MyListingsScreen} />
    <Stack.Screen name="Users Listings" component={UsersListingsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
