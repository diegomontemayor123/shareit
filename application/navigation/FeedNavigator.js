import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipesScreen from "../screens/RecipesScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator presentation="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Recipes" component={RecipesScreen} />
    <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
