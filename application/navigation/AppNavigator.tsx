import React from "react";
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import RecipeEditScreen from "../screens/RecipeEditScreen";
import NewRecipeButton from "./NewRecipeButton";
import useNotifications from "../hooks/useNotifications";
import SearchScreen from "../screens/SearchScreen";
import ProfileNavigator from "./ProfileNavigator";
import { HeaderLeftButton, HeaderRightButton } from "../components/HeaderButtons";
import colors from "../config/colors";
import MyCookBook from "../screens/MyCookbook";
import AllRecipesScreen from "../screens/AllRecipesScreen";
import ContactsScreen from '../screens/ContactsScreen'

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

const AppNavigator: any = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainTab" component={MainTab} options={{
      title: "Back", headerShown: false
    }} />
    <Stack.Screen name="Chat" component={ChatScreen}
      options={({ navigation }) => ({
        title: "Chat",
        headerStyle: { backgroundColor: colors.light },
        headerRight: () => <HeaderRightButton navigation={navigation} />
      })} />
    <Stack.Screen name="Contacts Screen" component={ContactsScreen}
      options={({ navigation }) => ({
        title: "Contacts",
        headerStyle: { backgroundColor: colors.light },
        headerRight: () => <HeaderRightButton navigation={navigation} />
      })} />


  </Stack.Navigator>
);

const MainTab: any = () => {
  useNotifications();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Profile",
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Cookbook"
        component={MyCookBook}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Cookbook",
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Edit"
        component={RecipeEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewRecipeButton onPress={() => navigation.navigate("Edit")} />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chef-hat" color={color} size={size} />
          ),
          headerShown: false,

        })}
      />
      <Tab.Screen
        name="Recipes"
        component={AllRecipesScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list-outline" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Feed",
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
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
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator;
