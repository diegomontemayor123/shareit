import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Button, FlatList } from "react-native";
import colors from "../config/colors";
import { useState, useEffect } from "react";
import categories from "../config/categories";
import feedSorts from "../config/feedSorts";
import CategoryPickerItem from "./CategoryPickerItem";
import Screen from "./Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface SorterFilter {
    color?: keyof typeof colors;
    onSortChange: (sort: any) => void;
    onCategoryFilterChange: (categoryFilter: any) => void;
}

const SorterFilter: React.FC<SorterFilter> = ({ color = "medium", onCategoryFilterChange, onSortChange }) => {

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
                style={[styles.button, { backgroundColor: colors[color] }]}
                onPress={() => { setShowSorts(true) }}>
                <Text style={styles.text}>{titleSort}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors[color] }]}
                onPress={() => { setShowCategories(true) }}>
                <Text style={styles.text}>{titleFilter}</Text>
            </TouchableOpacity>

            {selectedCategory &&
                (<TouchableOpacity onPress={() => { setSelectedCategory(null), onCategoryFilterChange(null) }} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="close-circle" size={22} color={colors.light} />
                </TouchableOpacity>)}

            <Modal visible={showCategories} animationType="slide"><Screen>
                <Button title="Back" onPress={() => setShowCategories(false)} />
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
                <Button title="Back" onPress={() => setShowSorts(false)} />
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
        color: colors.white,
        fontSize: 17,
    },
    deleteButton: {
        top: "0.5%",
        right: "102%"
    },
});

export default SorterFilter;
