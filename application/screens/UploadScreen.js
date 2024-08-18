import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";

function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        {progress < 0.99 ? (
          <LottieView
          autoPlay
          loop={true}
          source={require("../assets/animations/cooking.json")}
          style={styles.animation}
        />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200, 
    height: 200, 
    
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
});

export default UploadScreen;