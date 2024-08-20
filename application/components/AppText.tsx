import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import defaultStyles from "../config/styles";

interface AppTextProps extends TextProps {
  style?: TextStyle;
}

const AppText: React.FC<AppTextProps> = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
