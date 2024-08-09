import React from "react";
import { View, StyleSheet, Modal, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import colors from "../config/colors";


const { width, height } = Dimensions.get('window');

function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        {progress < 0.99 ? (
          <Progress.Bar
            color={colors.primary}
            progress={progress}
            width={200}
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
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
    
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Added background transparency for better UX
  },
});

export default UploadScreen;