import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const AccountNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="My Recipes" component={MyRecipesScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AccountNavigator;
