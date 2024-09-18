import React, { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import RecipesScreen from "./RecipesScreen";
import { Searchbar } from 'react-native-paper';

function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [users, setUsers] = useState<any>(null)

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };
  const handleSearchChange = (query: any) => {
    setSearch(query);
  };

  const handleUsersChange = (usersMap: { [_id: string]: string }) => {
    setUsers(usersMap);
  };


  const filterSearch = (recipes: any) => {



    let matchedUserId: string | undefined;
    if (users) {
      matchedUserId = Object.keys(users).find((userId) =>
        users[userId].toLowerCase().includes(search.toLowerCase())
      );
    }

    return recipes.filter((recipe: any) =>


      selectedCategory
        ? recipe.categoryId == selectedCategory.value
        && (recipe.title.toLowerCase().includes(search.toLowerCase()) ||
          recipe.userId.toLowerCase() === matchedUserId)
        : (recipe.title.toLowerCase().includes(search.toLowerCase()) ||
          recipe.userId.toLowerCase() === matchedUserId))
  }

  return (
    <>
      <Searchbar style={styles.search}
        placeholder="Search Recipes or Users"
        onChangeText={handleSearchChange}
        value={search}
        placeholderTextColor={colors.medium}
      />
      <RecipesScreen
        filterFn={filterSearch}
        navigation={navigation}
        searchPage={search.length > 0 ? false : true}
        errorMessage="Couldn't retrieve the recipes."
        emptyMessage="No recipes available."
        onCategoryChange={handleCategoryChange}
        onUsersChange={handleUsersChange}
      />
    </>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: colors.light,
    color: colors.medium,
    borderRadius: 10
  },
});

export default SearchScreen;
