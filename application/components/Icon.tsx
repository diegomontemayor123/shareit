import React from "react";
import { View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface IconProps {
  name: any
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  borderRadius?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
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
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
};

export default Icon;
