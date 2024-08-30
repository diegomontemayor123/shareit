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
import ChatScreen from "../screens/ChatScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  useNotifications();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Back" component={Feed} options={{ headerShown: false }} />
      <Stack.Screen name="Users Recipes" component={UsersRecipesScreen} options={{ title: "", headerShown: true }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Chat", headerShown: true, }} />
    </Stack.Navigator>
  );
};

const Feed: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="view-list-outline" color={color} size={size} />
        ),
        headerShown: true,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={size} />
        ),
        headerShown: true,
      }}
    />
    <Tab.Screen
      name="Edit"
      component={RecipeEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewRecipeButton onPress={() => navigation.navigate(routes.RECIPE_EDIT)} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chef-hat" color={color} size={size} />
        ),
      })}
    />

    <Tab.Screen
      name="My Recipes"
      component={MyRecipesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="notebook" color={color} size={size} />
        ),
        headerShown: true,
      }}
    />
    <Tab.Screen
      name="Profile"
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
