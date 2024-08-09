import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../config/colors";

const InitialsAvatar = ({ firstName, lastName, size = 50 }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.medium, // Customize this as needed
  },
  initials: {
    fontSize: 20, // Adjust size as needed
    color: "#fff", // Adjust text color as needed
    fontWeight: "bold",
  },
});

export default InitialsAvatar;
