import React, { useRef, RefObject } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageSelector from "./ImageSelector";
import { useEffect } from "react";

interface ImageListProps {
  imageUris: any
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string | null) => void;
}

const ImageList: React.FC<ImageListProps> = ({ imageUris = [], onRemoveImage, onAddImage, }) => {
  const scrollView: RefObject<ScrollView> = useRef<ScrollView>(null);

  useEffect(() => {
    console.log('imageUris :' + imageUris.length + ":")

  }, [imageUris])

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris != "" ?

            imageUris.map((uri: any) => (

              <View key={uri} style={styles.image}>
                <ImageSelector
                  imageUri={uri}
                  onChangeImage={() => onRemoveImage(uri)}
                />
              </View>
            ))
            : null
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
