import React from "react";
import { View, StyleSheet } from "react-native"
import Text from '.././Text'
import Icon from ".././Icon";
import ListItem from ".././lists/ListItem";
import InitialsAvatar from ".././InitialsAvatar";
import routes from "../../navigation/routes";
import colors from "../../config/colors";

function ListingHeader({ title, time, categoryIcon, categoryColor, userName, listingCount, navigation, userEmail }) {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Icon backgroundColor={categoryColor} name={categoryIcon} size={35} />
      </View>
      <Text style={styles.time}>~{time} hrs</Text>
      <View style={styles.userContainer}>
        <ListItem
          IconComponent={
            <InitialsAvatar
              firstName={userName.split(" ")[0]}
              lastName={userName.split(" ")[1] || ""}
              size={55}
            />
          }
          title={userName}
          onPress={() => navigation.navigate(routes.USERSLISTINGSSCREEN, { userEmail })}
          subTitle={listingCount === 1 ? `${listingCount} Recipe` : `${listingCount} Recipes`}
        />
      </View>
    </View>
  );
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
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 0,
  },
});

export default ListingHeader;
