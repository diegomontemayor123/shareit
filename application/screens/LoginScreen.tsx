import React, { useState } from "react";
import { StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton, } from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

interface FormValues {
  email?: string;
  password?: string;
}

function LoginScreen() {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }: FormValues) => {
    if (!email || !password) { return setLoginFailed(true) }
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);
    logIn(result.data as string);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-blue.png")} />

        <Form
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <SubmitButton title="Login" />
        </Form>
      </Screen>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 300,
    height: 80,
    alignSelf: "center",
    marginTop: 170,
    marginBottom: 20,
  },
});

export default LoginScreen;
