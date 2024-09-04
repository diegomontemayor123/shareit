import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EnterScreen from "../screens/EnterScreen";

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Enter" component={EnterScreen} options={{ headerShown: false, title: "Back" }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: "" }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "" }} />
  </Stack.Navigator>
);

export default AuthNavigator;
