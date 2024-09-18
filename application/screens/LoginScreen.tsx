import React, { useState } from "react";
import { StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton, } from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import { forgotPassword } from "../api/users";
import { Alert } from "react-native";
import { useFormikContext } from "formik";

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
  const [loginFailed, setLoginFailed] = useState<any>();
  const handleSubmit = async ({ email, password }: FormValues) => {
    try {



      if (!email || !password) { return setLoginFailed('You must enter both an email and a password.') }
      const result: any = await authApi.login(email, password);
      if (result.data.error) return setLoginFailed('Invalid Email or Password');
      setLoginFailed(false);
      logIn(result.data as string);
    } catch (error) {
      return setLoginFailed('We are temporarily having issues reaching our servers.');
    }
  };


  const ForgotPasswordButton: React.FC = () => {
    const { values } = useFormikContext<FormValues>();
    const handleForgotPassword = async () => {
      try {
        if (!values.email) {
          Alert.alert('Error', 'Please enter your email address.');
          return;
        } Alert.alert
          ('Success', 'If e-mai exists, password reset instructions will be sent to your email. Please double check the Spam folder.');
        await forgotPassword(values.email);
      } catch (error) {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    };
    return (
      <TouchableWithoutFeedback onPress={handleForgotPassword}>
        <Text style={{ textAlign: 'center', fontSize: 12, color: colors.primary }}>Forgot Password?</Text>
      </TouchableWithoutFeedback>)
  }

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
            error={loginFailed}
            visible={!!loginFailed}
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
          <ForgotPasswordButton />
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
  }
});

export default LoginScreen;
