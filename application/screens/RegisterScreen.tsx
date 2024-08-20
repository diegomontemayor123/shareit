import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import users from "../api/users";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(users.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (userInfo: { name?: string; email?: string; password?: string }) => {
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
        </Screen>
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
