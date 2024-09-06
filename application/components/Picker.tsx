import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./AppText";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
import Screen from "./Screen";

interface PickerItemType {
  label: string;
  value: string | number;
  backgroundColor?: string;
  icon?: string;
}

interface AppPickerProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  items: PickerItemType[];
  numberOfColumns?: number;
  onSelectItem: (item: PickerItemType) => void;
  PickerItemComponent?: React.ComponentType<{ item: PickerItemType; onPress: () => void }>;
  placeholder: string;
  selectedItem?: PickerItemType;
  width?: string;
}

const AppPicker: React.FC<AppPickerProps> = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }] as ViewStyle}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={{}}>
          <View style={{ padding: 15 }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={30} />
            </TouchableWithoutFeedback>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
