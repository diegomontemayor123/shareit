import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import colors from "../config/colors";


interface ImageSelectorProps {
  imageUri?: string;
  onChangeImage: (uri: string | null) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ imageUri, onChangeImage }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("Permission required to access the library.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ rotate: 0 }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        onChangeImage(manipulatedImage.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
          <>
            <MaterialCommunityIcons
              color={colors.medium}
              name="camera-plus-outline"
              size={35}
            />
            <Text style={styles.text}>Edit</Text>
          </>
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 80,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 80,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  text: {
    color: colors.medium,
    textAlign: "center",
    marginTop: 3

  }
});

export default ImageSelector;
