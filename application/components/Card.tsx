import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Image } from 'react-native-expo-image-cache';
import Text from "./AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "./Icon";
import RecipeLikes from "./RecipeComponents/RecipeLikes";

interface CardProps{
  title: string
  subTitle?: string
  subTitle2?: string
  category: string
  color: string
  imageUrl: string
  onPress: () => void
  thumbnailUrl: string
  onDelete?: () => void
  showDeleteButton: boolean
  likesCount: number
  addLike: ()=>void
}

const Card: React.FC<CardProps> = ({ title, subTitle, subTitle2, category, color, imageUrl, onPress, thumbnailUrl, onDelete, showDeleteButton, likesCount, addLike }) =>{
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image 
          style={styles.image} 
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl} 
        />
         {showDeleteButton && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <MaterialCommunityIcons name="close-circle" size={30} color={colors.light} />
          </TouchableOpacity>
        )}
          
        <RecipeLikes likesCount={likesCount} addLike={addLike}/>

        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Icon
          backgroundColor={color}
          name={category}
          size={35}
        />
          </View>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle} numberOfLines={1}>
              {subTitle}
            </Text>
            <Text style={styles.subTitle2} numberOfLines={1}>
              {subTitle2}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    flex: 1,
  },
  subTitle2: {
    color: colors.black,
    textAlign: "right",
  },
  title: {
    marginBottom: 7,
    fontWeight: "bold",
  },
});

export default Card;
