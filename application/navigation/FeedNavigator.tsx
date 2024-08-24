import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllRecipesScreen from "../screens/AllRecipesScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Recipes" component={AllRecipesScreen} />
    <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
