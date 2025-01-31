import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Image } from 'react-native-expo-image-cache';
import Text from "./AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "./Icon";
import RentalLikes from "./RentalComponents/RentalLikes";

const Slide: React.FC<any> = ({ title, subTitle, subTitle2, category, color, imageUrl, onPress, thumbnailUrl, likesCount, addLike, addBookmark, showBookmark, profilePage }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.Slide}>
        <Image
          style={profilePage ? styles.profileImage : styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <TouchableOpacity onPress={addBookmark} style={styles.Button}>
          {showBookmark ?
            <MaterialCommunityIcons name="bookmark" size={30} color={colors.light} />
            : <MaterialCommunityIcons name="bookmark-outline" size={30} color={colors.light} />
          }
        </TouchableOpacity>
        <RentalLikes likesCount={likesCount} addLike={addLike} />
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} >
              {title}
            </Text>
            <Icon
              backgroundColor={color}
              name={category}
              size={35}
            />
          </View>
          {!profilePage && <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle} numberOfLines={1}>
              {subTitle}
            </Text>
            <Text style={styles.subTitle2} numberOfLines={1}>
              {subTitle2}
            </Text>
          </View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  Slide: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  Button: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  profileImage: {
    width: "100%",
    height: 150,
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
    fontSize: 16
  },
  subTitle2: {
    color: colors.black,
    textAlign: "right",
    fontSize: 16
  },
  title: {
    marginBottom: 7,
    fontWeight: "bold",
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 17
  },
});

export default Slide;
