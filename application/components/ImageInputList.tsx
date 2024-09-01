import React, { useRef, RefObject } from "react";
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import ImageInput from "./ImageInput";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface ImageInputListProps {
  imageUris: string[];
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string | null) => void;
  placeholderUrl?: string;
  placeholderThumbnailUrl?: string
}

const ImageInputList: React.FC<ImageInputListProps> = ({ imageUris = [], onRemoveImage, onAddImage, placeholderUrl, placeholderThumbnailUrl }) => {
  const scrollView: RefObject<ScrollView> = useRef<ScrollView>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(imageUris.length === 0 && placeholderUrl != null);


  const handlePress = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Yes", onPress: () => setShowPlaceholder(false) },
      { text: "No" },])
  }

  useEffect(() => {
    setShowPlaceholder(imageUris.length === 0 && placeholderUrl != null);
  }, [imageUris, placeholderUrl]);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {showPlaceholder && placeholderUrl ? (
            <TouchableWithoutFeedback onPress={handlePress}>
              <View>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10, marginVertical: 10 }}
                  tint="light"
                  preview={{ uri: placeholderThumbnailUrl }}
                  uri={placeholderUrl}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            imageUris.map((uri) => (
              <View key={uri} style={styles.image}>
                <ImageInput
                  imageUri={uri}
                  onChangeImage={() => onRemoveImage(uri)}
                />
              </View>
            ))
          )}
          <View style={styles.image}>
            <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
