import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Text from "../AppText";
import colors from "../../config/colors";

interface EntryProps {
  title: string;
  subTitle?: string | null;
  image?: any;
  IconComponent?: React.ReactNode;
  onPress?: () => void;
  renderRightActions?: () => React.ReactNode;
  containerPadding?: number;
  containerMarginVert?: number;
  icon1?: any
  icon2?: any
  icon2Color?: any
  icon2Function?: any
  icon3?: any
  icon3Color?: any
  icon3Function?: any
}

const Entry: React.FC<EntryProps> = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  containerPadding = 10,
  containerMarginVert = 0,
  icon1,
  icon2,
  icon2Color,
  icon2Function,
  icon3,
  icon3Color,
  icon3Function,

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
      {icon3 &&
        <TouchableOpacity onPress={icon3Function} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons color={icon3Color ? icon3Color : colors.medium} name={icon3} size={35} />
        </TouchableOpacity>
      }
      {icon2 &&
        <TouchableOpacity onPress={icon2Function} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons color={icon2Color ? icon2Color : colors.medium} name={icon2} size={35} />
        </TouchableOpacity>
      }
      {icon1 ?
        <MaterialCommunityIcons color={colors.medium} name={icon1} size={35} />
        : <MaterialCommunityIcons color={colors.medium} name="chevron-right" size={35} />
      }

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
    backgroundColor: colors.light,
    borderRadius: 10
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

export default Entry;
