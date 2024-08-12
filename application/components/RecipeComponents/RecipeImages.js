import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Image } from 'react-native-expo-image-cache';

function RecipeImages({ images, width }) {
  return (
    <FlatList
      data={images}
      horizontal
      renderItem={({ item }) => (
        <Image
          style={[styles.image, { width }]}
          preview={{ uri: item.thumbnailUrl }}
          tint='light'
          uri={item.url}
        />
      )}
      keyExtractor={(item) => item.url}
      pagingEnabled
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
 
  },
});

export default RecipeImages;
