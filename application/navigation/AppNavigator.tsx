import React from "react";
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import RentalAddScreen from "../screens/RentalAddScreen"
import NewRentalButton from "./NewRentalButton"
import useNotifications from "../hooks/useNotifications";
import SearchScreen from "../screens/SearchScreen";
import GearNavigator from "./GearNavigator"
import { HeaderLeftButton, HeaderRightButton } from "../components/HeaderButtons";
import colors from "../config/colors";
import MyWishlist from "../screens/MyWishlist"
import AllRentalsScreen from "../screens/AllRentalsScreen"
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
        name="My Gear"
        component={GearNavigator}
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
        name="Add"
        component={RentalAddScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewRentalButton onPress={() => navigation.navigate("Add")} />
          ),
          headerShown: false,

        })}
      />
      <Tab.Screen
        name="Rentals"
        component={AllRentalsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list-outline" color={color} size={size} />
          ),
          headerShown: true,
          title: "",
          tabBarLabel: "Rentals(FEED)",
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
