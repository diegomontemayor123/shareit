import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import UserEditScreen from "../screens/UserEditScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import UsersRecipesScreen from "../screens/UsersRecipesScreen";


const Stack = createStackNavigator();

const FeedNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>

    <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    <Stack.Screen name="Users Recipes" component={UsersRecipesScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
