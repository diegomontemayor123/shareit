// components/ActivityIndicator.js
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get('window');

function ActivityIndicator({ visible = false }) {
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
}

const styles = StyleSheet.create({
  animation: {
    width: width, // Adjust as needed
    height: height * 0.5, // Adjust as needed

  },
  overlay:{
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.8
  }
});

export default ActivityIndicator;
