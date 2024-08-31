import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
  imageUrl?: any
  thumbnailUrl?: any
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, imageUrl, thumbnailUrl, size = 50 }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 4 } as ViewStyle,
      ]}
    >
      {imageUrl != null ?
        <Image
          style={{ width: size, height: size, borderRadius: size / 4 }}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        : <Text style={[styles.initials, { fontSize: size / 2.5 } as TextStyle]}>
          {initials}
        </Text>}
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

export default Avatar;
