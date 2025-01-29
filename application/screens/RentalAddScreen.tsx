import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import { Form, FormField, FormPicker as Picker, SubmitButton } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import useSubmitRental from "../hooks/useSubmitRental";
import { categories } from "../config/categories";
import FormDatePicker from "../components/forms/FormDatePicker";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  dailyPrice: Yup.number().required().min(.001, "Please input Daily Price.").max(10000).label("Daily Price"),
  bookings: Yup.mixed().label("Availability"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function RentalAddScreen({ navigation, route }: any) {
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
              dailyPrice: "",
              bookings: "",
              description: "",
              category: "",
              images: []
            } as any}
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
              name="dailyPrice"
              placeholder={"Daily Price"}
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
              name="description"
              numberOfLines={10}
              placeholder={"Description"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <AppText style={defaultStyles.text}>Blocked Dates</AppText>
            <FormDatePicker name="bookings" placeholder={null} />
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
