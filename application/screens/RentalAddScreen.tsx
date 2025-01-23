import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import { Form, FormField, FormPicker as Picker, SubmitButton } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import useSubmitRental from "../hooks/useSubmitRental";
import { categories, getCategoryLabelByValue } from "../config/categories";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  timeToComplete: Yup.number().required().min(1, "Please input at least one minute.").max(10000).label("Time to Complete"),
  availdates: Yup.string().required().label("availdates"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});


interface RentalEditScreenProps {
  navigation: any;
  route: any
}
interface RentalFormValues {
  name?: string
  title: string;
  timeToComplete: string;
  availdates: string;
  description: string;
  category: any;
}
function RentalAddScreen({ navigation, route }: RentalEditScreenProps) {
  const { handleSubmit, uploadVisible, progress } = useSubmitRental({ navigation });


  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Screen style={styles.container}>
          <UploadScreen
            progress={progress}
            visible={uploadVisible}
          />
          <Form
            initialValues={{
              title: "",
              timeToComplete: "",
              availdates: "",
              description: "",
              category: "",
              images: []
            } as RentalFormValues}
            onSubmit={(values: any, { resetForm }: any) => handleSubmit(values, { resetForm },)}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images"
              placeholderUrls={[]} />
            <FormField
              maxLength={255}
              name="title"
              placeholder={"Title"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="timeToComplete"
              placeholder={"Min. to complete"}
              width={250}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <Picker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder={"Category"}
              width="50%"
            />
            <FormField
              maxLength={1000}
              multiline
              name="availdates"
              numberOfLines={10}
              placeholder={"Availability - Please separate each availdate with a period '.'"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              maxLength={1000}
              multiline
              name="description"
              numberOfLines={10}
              placeholder={"Rental - Please separate each step with a period '.'"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <SubmitButton title={"Done"} />
          </Form>
        </Screen>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RentalAddScreen;
