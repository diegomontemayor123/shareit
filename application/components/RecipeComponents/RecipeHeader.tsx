import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import Icon from "../Icon";
import { ListItem } from "../lists";
import Avatar from "../Avatar";
import routes from "../../navigation/routes";
import colors from "../../config/colors";
import { getUserbyEmail } from "../../api/users"


interface RecipeHeaderProps {
  title: string;
  time: number;
  categoryIcon: string;
  categoryColor: string;
  userName: string;
  recipeCount: number;
  navigation: any;
  userEmail: string;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  time,
  categoryIcon,
  categoryColor,
  userName = "Undefined",
  recipeCount,
  navigation,
  userEmail,

}) => {
  const [displayImage, setDisplayImage] = useState<{ url: string | null, thumbnailUrl: string | null } | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await getUserbyEmail(userEmail)
      console.log('result ' + JSON.stringify(result))
      setDisplayImage({ url: result.images?.url || null, thumbnailUrl: result.images?.thumbnailUrl || null })
    }
    fetchImages()
  }, [])


  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Icon backgroundColor={categoryColor} name={categoryIcon} size={35} />
      </View>
      <Text style={styles.time}>~{time} min</Text>
      <View>
        <ListItem
          IconComponent={
            <Avatar
              firstName={userName.split(" ")[0]}
              lastName={userName.split(" ")[1] || ""}
              size={55}
              imageUrl={displayImage?.url || null}
              thumbnailUrl={displayImage?.thumbnailUrl || null}
            />
          }
          title={userName}
          onPress={() => navigation.navigate(routes.USERSRECIPESSCREEN, { userEmail })}
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
  time: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RecipeHeader;
