import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import RecipeEditScreen from "../screens/RecipeEditScreen";
import NewRecipeButton from "./NewRecipeButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import SearchScreen from "../screens/SearchScreen";
import { Button } from "react-native";

const Tab = createBottomTabNavigator();

const HeaderRightButton = ({ navigation }: any) => (
  <Button title="Account" onPress={() => navigation.navigate('Profile', { screen: 'Account' })} />
);


const AppNavigator: React.FC = () => {
  useNotifications();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list-outline" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Feed",
          headerRight: () => <HeaderRightButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Search",
          headerRight: () => <HeaderRightButton navigation={navigation} />,
        })}
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
          headerShown: false,

        })}
      />
      <Tab.Screen
        name="Cookbook"
        component={MyRecipesScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Cookbook",
          headerRight: () => <HeaderRightButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={AccountNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,

        })}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator;
