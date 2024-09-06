import React from "react";
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import FeedNavigator from "./FeedNavigator";
import RecipeEditScreen from "../screens/RecipeEditScreen";
import NewRecipeButton from "./NewRecipeButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileNavigator from "./ProfileNavigator";
import { HeaderLeftButton, HeaderRightButton } from "../components/HeaderButtons";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
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

  </Stack.Navigator>
);

const MainTab: React.FC = () => {
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
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
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
    </Tab.Navigator>
  )
}

export default AppNavigator;
