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
import FormDatePicker from "../components/forms/FormDatePicker";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

const editValidation = Yup.object().shape({
  images: Yup.array().min(1, "Please select at least one image."),
});


function RentalEditScreen({ navigation, route }: any) {
  const { handleSubmit, uploadVisible, progress } = useSubmitRental({ navigation });
  const [rental, setRental] = useState(route.params || null)

  useFocusEffect(
    React.useCallback(
      () => {
        setRental(route.params)
      }, [route.params]))

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
              images: rental?.images?.map((image: any) => image.url) || []
            } as any}
            onSubmit={(values: any, { resetForm }: any) => handleSubmit(values, { resetForm }, rental._id)}
            validationSchema={editValidation}
          >
            <FormImagePicker name="images"
              placeholderUrls={rental?.images?.map((image: any) => image.url) || []} />
            <FormField
              maxLength={255}
              name="title"
              placeholder={rental?.title || "Title"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="dailyPrice"
              placeholder={rental ? "$" + rental.dailyPrice.toString() + " / day" : "Daily Price"}
              width={250}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <Picker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder={getCategoryLabelByValue(rental?.categoryId) || "Category"}
              width="50%"
            />
            <FormField
              maxLength={1000}
              multiline
              name="description"
              numberOfLines={10}
              placeholder={rental?.description || "Description"}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <AppText style={defaultStyles.text}>Blocked Dates</AppText>
            <FormDatePicker name="bookings" placeholder={rental ? JSON.parse(rental.bookings) : null} />
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

export default RentalEditScreen;
