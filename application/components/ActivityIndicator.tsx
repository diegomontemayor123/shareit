import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

interface ActivityIndicatorProps {
  visible?: boolean;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: width,
    height: height * 0.5,
  },
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
