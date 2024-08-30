import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import { Form, FormField, FormPicker as Picker, SubmitButton } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import useSubmitRecipe from "../hooks/useSubmitRecipe";
import categories from "../config/categories";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  time: Yup.number().required().min(1, "Please input at least one minute.").max(10000).label("Time"),
  ingredients: Yup.string().required().label("Ingredients"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

interface RecipeEditScreenProps {
  navigation: any;
}

interface RecipeFormValues {
  name?: string
  title: string;
  time: string;
  ingredients: string;
  description: string;
  category: any;
  images: any[];
}

function RecipeEditScreen({ navigation }: RecipeEditScreenProps) {
  const { handleSubmit, uploadVisible, progress } = useSubmitRecipe({ navigation });

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
              time: "",
              ingredients: "",
              description: "",
              category: null,
              images: [],
            } as RecipeFormValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images" />
            <FormField
              maxLength={255}
              name="title"
              placeholder="Title"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="time"
              placeholder="Minutes - time to complete"
              width={250}
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <Picker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Cuisine"
              width="50%"
            />
            <FormField
              maxLength={1000}
              multiline
              name="ingredients"
              numberOfLines={10}
              placeholder="Ingredients - Please separate each ingredient with a period '.'"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <FormField
              maxLength={1000}
              multiline
              name="description"
              numberOfLines={10}
              placeholder="Recipe - Please separate each step with a period '.'"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <SubmitButton title="Post" />
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

export default RecipeEditScreen;
