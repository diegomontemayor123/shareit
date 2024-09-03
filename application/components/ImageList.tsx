import React, { useRef, RefObject } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageSelector from "./ImageSelector";

interface ImageListProps {
  imageUris: string[];
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string | null) => void;
}

const ImageList: React.FC<ImageListProps> = ({ imageUris = [], onRemoveImage, onAddImage, }) => {
  const scrollView: RefObject<ScrollView> = useRef<ScrollView>(null);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageSelector
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))
          }
          <View style={styles.image}>
            <ImageSelector onChangeImage={(uri) => onAddImage(uri)} />
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

export default ImageList;
