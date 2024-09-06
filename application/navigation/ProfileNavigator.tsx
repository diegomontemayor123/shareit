import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import UserEditScreen from "../screens/UserEditScreen";


const Stack = createStackNavigator();

const ProfileNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Recipes" component={MyRecipesScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="User Edit" component={UserEditScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
