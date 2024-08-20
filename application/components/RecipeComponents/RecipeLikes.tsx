import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from '../AppText';
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface RecipeLikesProps {
  likesCount: number;
  addLike: () => void;
}

const RecipeLikes: React.FC<RecipeLikesProps> = ({ likesCount, addLike }) => (
  <View style={styles.likesContainer}>
    <TouchableOpacity onPress={addLike} style={styles.likes}>
      {likesCount > 0 && <Text style={styles.likesCount}>{likesCount}</Text>}
      <MaterialCommunityIcons name="heart" size={35} color={"red"} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  likesContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likes: {
    position: 'relative',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likesCount: {
    position: 'absolute',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    zIndex: 2,
  },
});

export default RecipeLikes;
