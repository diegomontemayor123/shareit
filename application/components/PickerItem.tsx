import React from "react";
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import Text from "./AppText";


interface PickerItemProps {
  item: {
    label: string;
    value: string | number;
  };
  onPress: (event: GestureResponderEvent) => void; 
}

const PickerItem: React.FC<PickerItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
