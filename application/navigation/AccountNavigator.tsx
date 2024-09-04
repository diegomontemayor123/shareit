import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import UserEditScreen from "../screens/UserEditScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const AccountNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} options={{
      title: "",
    }} />
    <Stack.Screen name="User Edit" component={UserEditScreen} options={{
      title: "",
    }} />
    <Stack.Screen name="Messages" component={MessagesScreen} options={{
      title: "Messages",
    }} />
    <Stack.Screen name="Chat" component={ChatScreen} options={{
      title: "Chat",
    }} />

  </Stack.Navigator>
);

export default AccountNavigator;
