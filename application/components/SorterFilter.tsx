import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Button, FlatList } from "react-native";
import colors from "../config/colors";
import { useState, useEffect } from "react";
import { categories } from "../config/categories";
import feedSorts from "../config/feedSorts";
import CategoryPickerItem from "./CategoryPickerItem";
import Screen from "./Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


interface SorterFilter {
    color?: keyof typeof colors;
    onSortChange: (sort: any) => void;
    onCategoryFilterChange: (categoryFilter: any) => void;
}

const SorterFilter: React.FC<SorterFilter> = ({ color = "white", onCategoryFilterChange, onSortChange }) => {

    const [titleSort, setTitleSort] = useState<string>('Sort')
    const [titleFilter, setTitleFilter] = useState<string>('Filter Categories')
    const [showSorts, setShowSorts] = useState<boolean>(false)
    const [showCategories, setShowCategories] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSort, setSelectedSort] = useState<any>(null);

    useEffect(() => {
        if (selectedSort) {
            setTitleSort(`Sort: ${selectedSort.label}`);
        } else {
            setTitleSort('Sort: Latest');
        }
    }, [selectedSort]);

    useEffect(() => {
        if (selectedCategory) {
            setTitleFilter(`${selectedCategory.label}`);
        } else {
            setTitleFilter('Filter Cuisine');
        }
    }, [selectedCategory]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors[color], borderWidth: 1 }]}
                onPress={() => { setShowSorts(true) }}>
                <Text style={styles.text}>{titleSort}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors[color], borderWidth: 1 }]}
                onPress={() => { setShowCategories(true) }}>
                <Text style={styles.text}>{titleFilter}</Text>
            </TouchableOpacity>

            {selectedCategory &&
                (<TouchableOpacity onPress={() => { setSelectedCategory(null), onCategoryFilterChange(null) }} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="close-circle" size={22} color={colors.light} />
                </TouchableOpacity>)}

            <Modal visible={showCategories} animationType="slide"><Screen>
                <View style={{ padding: 15 }}>
                    <TouchableWithoutFeedback onPress={() => setShowCategories(false)}>
                        <MaterialCommunityIcons name="close" size={30} />
                    </TouchableWithoutFeedback>
                </View>
                <FlatList
                    data={categories}
                    keyExtractor={(category) => category.value.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <CategoryPickerItem
                            item={item}
                            onPress={() => {
                                setShowCategories(false)
                                setSelectedCategory(item);
                                onCategoryFilterChange(item)
                            }} />)} />
            </Screen></Modal>

            <Modal visible={showSorts} animationType="slide"><Screen>
                <View style={{ padding: 15 }}>
                    <TouchableWithoutFeedback onPress={() => setShowSorts(false)}>
                        <MaterialCommunityIcons name="close" size={30} />
                    </TouchableWithoutFeedback>
                </View>
                <FlatList
                    data={feedSorts}
                    keyExtractor={(filter) => filter.value.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <CategoryPickerItem
                            item={item}
                            onPress={() => {
                                setShowSorts(false)
                                setSelectedSort(item);
                                onSortChange(item)
                            }} />)} />
            </Screen></Modal>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "45%"
    },
    button: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        width: "100%",
        marginBottom: 8,
        marginHorizontal: "5%",
    },
    text: {
        color: colors.medium,
        fontSize: 17,
    },
    deleteButton: {
        top: "0.5%",
        right: "102%"
    },
});

export default SorterFilter;
