import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import RecipeEditScreen from "../screens/RecipeEditScreen";
import UsersRecipesScreen from "../screens/UsersRecipesScreen"; 
import NewRecipeButton from "./NewRecipeButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Back" 
        component={Feed} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Users Recipes" 
        component={UsersRecipesScreen} 
        options={{ title: "", headerShown: true}} 
      />
    </Stack.Navigator>
  );
};

const Feed = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ), headerShown: true,
      }}
    />
    <Tab.Screen
      name="Edit"
      component={RecipeEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewRecipeButton
            onPress={() => navigation.navigate(routes.RECIPE_EDIT)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="My Account"
      component={AccountNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
