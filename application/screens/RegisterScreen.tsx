import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import { register } from "../api/users";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import FormImagePicker from "../components/forms/FormImagePicker";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phoneNumber: Yup.string().required().max(11).min(10).label("Phone Number"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
  images: Yup.array().max(1, "Only one image allowed."),
});

function RegisterScreen() {
  const registerApi = useApi(register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (userInfo: { name?: string; email?: string; password?: string; images?: any[], phoneNumber?: any }) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else setError("An unexpected error occurred.");
      return;
    }

    const { data: authToken } = await loginApi.request(userInfo.email, userInfo.password);
    auth.logIn(authToken);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
        <Screen style={styles.container}>
          <Form
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images" multipleImages={false} />
            <ErrorMessage error={error} visible={!!error} />
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              autoCorrect={false}
              icon="phone"
              name="phoneNumber"
              placeholder="Phone Number"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              blurOnSubmit
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
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <SubmitButton title="Register" />
          </Form>
          <Text style={styles.text}>Please e-mail diegomontemayor.f@gmail.com with any questions.</Text>
        </Screen>
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: colors.primary,

  }
});

export default RegisterScreen;
