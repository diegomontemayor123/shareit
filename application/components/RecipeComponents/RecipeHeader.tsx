import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import Icon from "../Icon";
import { Entry } from "../entries";
import Avatar from "../Avatar";
import colors from "../../config/colors";
import { getUserbyId } from "../../api/users"


interface RecipeHeaderProps {
  recipeCount: number;
  navigation: any;
  recipe?: any
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  recipeCount,
  navigation,
  recipe

}) => {
  const [recipeUser, setRecipeUser] = useState({ _id: "", name: "", images: { url: null, thumbnailUrl: null } })
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getUserbyId(recipe.userId)
      setRecipeUser(result)
    }
    fetchImages()
  }, [recipe.userId])
  const createdAt = () => new Date(parseInt(recipe._id.toString().substring(0, 8), 16) * 1000).toString().substring(4, 15)

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Icon backgroundColor={recipe.categoryColor} name={recipe.categoryIcon} size={35} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.timeToComplete}>~{recipe.timeToComplete} min</Text>
        <Text style={{ fontSize: 12 }}>{createdAt()}</Text>
      </View>
      <View>
        <Entry
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
