import React, { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import RentalsScreen from "./RentalsScreen";
import { Searchbar } from 'react-native-paper';
function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const filterSearch = (rentals: any) => {
    const searchLower = search.toLowerCase();

    return rentals.filter((rental: any) =>
      selectedCategory
        ? rental.categoryId === selectedCategory.value &&
        (rental.title.toLowerCase().includes(searchLower))
        : (rental.title.toLowerCase().includes(searchLower)))
  }

  return (
    <><Searchbar style={styles.search}
      placeholder="Search Rentals"
      onChangeText={setSearch}
      value={search}
      placeholderTextColor={colors.medium}
    />
      <RentalsScreen
        filterFn={filterSearch}
        navigation={navigation}
        errorMessage="Couldn't retrieve the rentals."
        emptyMessage="No rentals available."
        onCategoryChange={setSelectedCategory}
      /></>)
}
const styles = StyleSheet.create({
  search: {
    marginHorizontal: 5,
    backgroundColor: colors.white,
    color: colors.medium,
    borderRadius: 10
  },
});

export default SearchScreen;
