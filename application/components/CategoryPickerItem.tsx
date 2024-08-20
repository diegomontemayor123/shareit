import React from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import Icon from "./Icon";
import Text from "./AppText";

interface PickerItemType {
  label: string;
  value: string | number;
  backgroundColor?: string;
  icon?: string;
}

interface CategoryPickerItemProps {
  item: PickerItemType;
  onPress: () => void;
}

const CategoryPickerItem: React.FC<CategoryPickerItemProps> = ({ item, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  } as ViewStyle, 
  label: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 16 
  } as TextStyle, 
});

export default CategoryPickerItem;
