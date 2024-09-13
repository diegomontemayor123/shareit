import React from "react";
import { View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface IconProps {
  name: any
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  iconRatio?: any
  onPress?: any
  borderRadius?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  iconRatio = 0.5,
  onPress,
  borderRadius = 10
}) => {

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: borderRadius,
    backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <View style={containerStyle}>
      <MaterialCommunityIcons name={name} color={iconColor} size={size * iconRatio} onPress={onPress} />
    </View>
  );
};

export default Icon;
