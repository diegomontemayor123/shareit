
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get('window');

function SubmitIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/loader.json")}
      style={styles.animation}
    />
  );
}

const styles = StyleSheet.create({
  animation: {
    width: width * 0.9, // Adjust as needed
    height: height * 0.5, // Adjust as needed

  },
});

export default SubmitIndicator;
