import React from "react";
import { StyleSheet, Dimensions, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get('window');

interface SubmitIndicatorProps {
  visible?: boolean;
}

const SubmitIndicator: React.FC<SubmitIndicatorProps> = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/loader.json")}
      style={styles.animation}
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: width * 0.9,
    height: height * 0.5,
  } as ViewStyle,
});

export default SubmitIndicator;
