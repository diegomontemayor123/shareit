
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import {Form, FormField, FormPicker as Picker, SubmitButton,} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import useSubmitRecipe from "../hooks/useSubmitRecipe";
import categories from "../config/categories";



const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  time: Yup.number().required().min(0.001).max(10000).label("Time"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});


function RecipeEditScreen({navigation}) {
  const { handleSubmit, uploadVisible, progress, setUploadVisible } = useSubmitRecipe({navigation})
  

  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          time: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} 
        name="title" 
        placeholder="Title" 
        blurOnSubmit={true}
        onSubmitEditing={Keyboard.dismiss}
        
        />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="time"
          placeholder="Time to Complete"
          width={250}
          blurOnSubmit={true}
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
          name="description"
          numberOfLines={10}
          placeholder="Recipe - Please separate each step with a period '.'"
          blurOnSubmit={true}
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