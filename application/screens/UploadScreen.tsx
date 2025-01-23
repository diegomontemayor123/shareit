import React from "react";
import { View, StyleSheet, Modal, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

interface UploadScreenProps {

  progress?: number;
  visible?: boolean;
}

const { width, height } = Dimensions.get("window");

function UploadScreen({ progress = 0, visible = false }: UploadScreenProps) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        {progress < 0.99 ? (
          <LottieView
            autoPlay
            loop
            source={require("../assets/animations/loader.json")}
            style={styles.animation}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
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
    width: width,
    height: height * 0.5,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default UploadScreen;
