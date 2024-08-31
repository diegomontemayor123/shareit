import React from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import Icon from "../Icon";
import { ListItem } from "../lists";
import Avatar from "../Avatar";
import routes from "../../navigation/routes";
import colors from "../../config/colors";

interface RecipeHeaderProps {
  title: string;
  time: number;
  categoryIcon: string;
  categoryColor: string;
  userName: string;
  recipeCount: number;
  navigation: any;
  userEmail: string;
  userImages: any
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
  userImages
}) => (

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
            imageUrl={userImages[0] ? userImages[0].url : null}
            thumbnailUrl={userImages[0] ? userImages[0].thumbnailUrl : null}
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
);

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
