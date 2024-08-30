import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import colors from "../config/colors";

interface InitialsAvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ firstName, lastName, size = 50 }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 4 } as ViewStyle,
      ]}
    >
      <Text style={[styles.initials, { fontSize: size / 2.5 } as TextStyle]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.medium,
  } as ViewStyle,
  initials: {
    color: "#fff",
    fontWeight: "bold",
  } as TextStyle,
});

export default InitialsAvatar;
