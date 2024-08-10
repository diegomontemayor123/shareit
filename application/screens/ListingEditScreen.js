
import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  { backgroundColor: "#fc5c65", icon: "pasta", label: "Italian", value: 1 },
  { backgroundColor: "#fd9644", icon: "food-turkey", label: "American", value: 2 },
  { backgroundColor: "#fed330", icon: "food-takeout-box", label: "Chinese", value: 3 },
  { backgroundColor: "#26de81", icon: "rice", label: "Japanese", value: 4 },
  { backgroundColor: "#2bcbba", icon: "taco", label: "Mexican", value: 5 },
  { backgroundColor: "#45aaf2", icon: "food-croissant", label: "Breakfast", value: 6 },
  { backgroundColor: "#4b7bec", icon: "food-apple", label: "Healthy", value: 7 },
  { backgroundColor: "#a55eea", icon: "food", label: "Guilty Pleasures", value: 8 },
  { backgroundColor: "#778ca3", icon: "food-variant", label: "Other", value: 9 },
];

function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const {user} = useAuth()

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => {
        setProgress(progress);
      },user
    );
    
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

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
          price: "",
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
          name="price"
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

export default ListingEditScreen;