import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import UserEditScreen from "../screens/UserEditScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import UsersRecipesScreen from "../screens/UsersRecipesScreen";
import RecipeEditScreen from "../screens/RecipeEditScreen";



const Stack = createStackNavigator();

const ProfileNavigator: any = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyRecipes" component={MyRecipesScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="User Edit" component={UserEditScreen} />
    <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    <Stack.Screen name="Edit" component={RecipeEditScreen} />
    <Stack.Screen name="Users Recipes" component={UsersRecipesScreen} />

  </Stack.Navigator>
);

export default ProfileNavigator;
