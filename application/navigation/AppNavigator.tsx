import React from "react";
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import useNotifications from "../hooks/useNotifications";
import SearchNavigator from "./SearchNavigator"
import { HeaderLeftButton, HeaderRightButton } from "../components/HeaderButtons";
import colors from "../config/colors";
import MyWishlist from "../screens/MyWishlist"
import MyRentalsScreen from "../screens/MyRentalsScreen"
import ContactsScreen from '../screens/ContactsScreen'
import MyGearScreen from "../screens/MyGearScreen";

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
        name="SearchNav"
        component={SearchNavigator}
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
        name="Wishlist"
        component={MyWishlist}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hiking" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Wishlist",
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="My Rentals"
        component={MyRentalsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list-outline" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "My Rentals",
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="My Gear"
        component={MyGearScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tennis-ball" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "My Gear",
          headerStyle: { backgroundColor: colors.light },
          headerRight: () => <HeaderRightButton navigation={navigation} />,
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        })}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator;
