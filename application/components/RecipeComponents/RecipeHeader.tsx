import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import Icon from "../Icon";
import { ListItem } from "../lists";
import Avatar from "../Avatar";
import colors from "../../config/colors";
import { getUserbyId } from "../../api/users"

interface RecipeHeaderProps {
  title: string;
  timeToComplete: number;
  categoryIcon: string;
  categoryColor: string;
  recipeCount: number;
  navigation: any;
  userId: string
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  timeToComplete,
  categoryIcon,
  categoryColor,
  recipeCount,
  navigation,
  userId,

}) => {
  const [recipeUser, setRecipeUser] = useState({ _id: "", name: "", images: { url: null, thumbnailUrl: null } })
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getUserbyId(userId)
      setRecipeUser(result)
    }
    fetchImages()
  }, [userId])


  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Icon backgroundColor={categoryColor} name={categoryIcon} size={35} />
      </View>
      <Text style={styles.timeToComplete}>~{timeToComplete} min</Text>
      <View>
        <ListItem
          IconComponent={
            <Avatar
              firstName={recipeUser.name.split(" ")[0]}
              lastName={recipeUser.name.split(" ")[1] || ""}
              size={55}
              imageUrl={recipeUser.images?.url || null}
              thumbnailUrl={recipeUser.images?.thumbnailUrl || null}
            />
          }
          title={recipeUser.name}
          onPress={() => navigation.navigate("Users Recipes", { userId: recipeUser._id })}
          subTitle={recipeCount === 1 ? `${recipeCount} Recipe` : `${recipeCount} Recipes`}
          containerPadding={0}
          containerMarginVert={10}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  timeToComplete: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RecipeHeader;
