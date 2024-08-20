import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";

const Stack = createStackNavigator();

const AccountNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="My Recipes" component={MyRecipesScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AccountNavigator;
