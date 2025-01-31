import React, { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import RentalsScreen from "./RentalsScreen";
import { Searchbar } from 'react-native-paper';
function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [users, setUsers] = useState<any>(null)

  const filterSearch = (rentals: any) => {
    const searchLower = search.toLowerCase();
    let matchedUserId: string | undefined;
    if (users) {
      matchedUserId = Object.keys(users).find((userId) =>
        users[userId].toLowerCase().includes(searchLower))
    }
    return rentals.filter((rental: any) =>
      selectedCategory
        ? rental.categoryId === selectedCategory.value &&
        (rental.title.toLowerCase().includes(searchLower) ||
          rental.userId.toLowerCase() === matchedUserId)
        : (rental.title.toLowerCase().includes(searchLower) ||
          rental.userId.toLowerCase() === matchedUserId))
  }

  return (
    <><Searchbar style={styles.search}
      placeholder="Search Rentals or Users"
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
        onUsersChange={setUsers}
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
