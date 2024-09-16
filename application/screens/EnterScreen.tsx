import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import Button from "../components/Button";
import colors from "../config/colors";

function EnterScreen({ navigation }: { navigation: any }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-blue.png")} />
        <Text style={styles.tagline}></Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Text style={styles.text}>
        Please e-mail diegomontemayor.f@gmail.com with any inquiries, concerns, or suggestions.</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
    marginBottom: 50
  },
  logo: {
    width: 300,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 170,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: colors.primary,
    marginBottom: 25

  }
});

export default EnterScreen;
