import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Text from "../AppText";
import colors from "../../config/colors";

interface ListItemProps {
  title: string;
  subTitle?: string;
  image?: any;
  IconComponent?: React.ReactNode;
  onPress?: () => void;
  renderRightActions?: () => React.ReactNode;
  containerPadding?: number;
  containerMarginVert?: number;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  containerPadding = 10,
  containerMarginVert = 0,
}) => {

  const content = (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { padding: containerPadding }, { marginVertical: containerMarginVert }]}
    >
      {IconComponent}
      {image && <Image style={styles.image} source={image} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subTitle && (
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        )}
      </View>
      <MaterialCommunityIcons color={colors.medium} name="chevron-right" size={25} />
    </TouchableOpacity>
  );


  return renderRightActions ? (
    <Swipeable renderRightActions={renderRightActions}>
      {content}
    </Swipeable>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
