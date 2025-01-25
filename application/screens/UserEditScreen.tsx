import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { ErrorMessage, Form, FormField, SubmitButton } from "../components/forms";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import FormImagePicker from "../components/forms/FormImagePicker";
import { getUserbyId, editUser } from "../api/users";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  name: Yup.string().optional().label("Name"),
  phoneNumber: Yup.string().optional().label("Phone Number"),
  email: Yup.string().optional().email().label("Email"),
  password: Yup.string().optional().min(5).label("Password"),
  images: Yup.array().max(1, "Only one image allowed."),
});

function UserEditScreen({ navigation }: any) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserbyId(user._id)
      setCurrentUser(result)
    }
    fetchUser()
  }, [])

  const editApi = useApi(editUser);
  const { user }: any = useAuth();
  const [error, setError] = useState<string | undefined>();
  const handleSubmit = async (newUserInfo: { name: string; email: string; password: string; phoneNumber: string; images: any[] }, { resetForm }: { resetForm: () => void }) => {

    const result = await editApi.request(user._id, newUserInfo)

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else setError("An unexpected error occurred.");
      return;
    }
    else {
      resetForm()
      navigation.navigate('My Gear')
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <ActivityIndicator visible={editApi.loading} />
        <Screen style={styles.container}>
          <Form
            initialValues={{ name: "", phoneNumber: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker
              name="images"
              multipleImages={false}
              placeholderUrls={[currentUser?.images.url] || null} />
            <ErrorMessage error={error} visible={!!error} />
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder={currentUser?.name || "name"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              autoCorrect={false}
              icon="phone"
              name="phoneNumber"
              placeholder={currentUser?.phoneNumber || "Phone Number"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder={currentUser?.email || "email"}
              textContentType="emailAddress"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="**********"
              secureTextEntry
              textContentType="password"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <SubmitButton title="Edit User" />
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

export default UserEditScreen;
