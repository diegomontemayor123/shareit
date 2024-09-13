import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Slide from "../components/Slide";
import colors from "../config/colors";
import recipesApi from "../api/recipes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import useRecipeActions from "../hooks/useRecipeActions";
import SorterFilter from "../components/SorterFilter";
import { getUserbyId } from "../api/users";
import { useFocusEffect } from '@react-navigation/native';


interface Recipe {
  id: number;
  title: string;
  timeToComplete: string;
  categoryIcon: string;
  categoryColor: string;
  images: { url: string; thumbnailUrl: string }[];
  likesCount: number;
}

interface RecipesProps {
  filterFn: (recipes: Recipe[]) => Recipe[];
  errorMessage: string;
  emptyMessage: string;
  navigation: any;
  onCategoryChange: any
  onUsersChange?: (users: any) => void;
  profilePage?: boolean
}

function RecipesScreen({ filterFn, errorMessage, emptyMessage, navigation, onCategoryChange, onUsersChange, profilePage = false }: RecipesProps) {
  const { handleAddLike, handleAddBookmark, handleRefresh, refreshing, filteredRecipes } = useRecipeActions(filterFn);
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const { user } = useAuth();

  const [selectedSort, setSelectedSort] = useState<any>()
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<any>()

  const [users, setUsers] = useState<{ [_id: string]: string }>({});

  const fetchUsers = async () => {
    const _ids = filteredRecipes.map((recipe) => recipe.userId);
    const userFetches = _ids.map(_id => getUserbyId(_id));
    const usersData = await Promise.all(userFetches);
    const usersMap: { [_id: string]: string } = {};
    usersData.forEach((userData, index) => {
      usersMap[_ids[index]] = userData.name;
    });
    setUsers(usersMap);
    onUsersChange ? onUsersChange(usersMap) : null
  };

  useEffect(() => {
    if (filteredRecipes.length > 0) {
      fetchUsers();
    }
  }, [filteredRecipes])

  useFocusEffect(
    React.useCallback(() => {
      getRecipesApi.request();
      handleRefresh()
    }, [])
  );

  const getSortedRecipes = () => {
    let sortedRecipes = [...filteredRecipes];
    if (selectedSort) {
      if (selectedSort.label === "Likes") {
        sortedRecipes.sort((a, b) => b.likesCount - a.likesCount);
      } else {
        sortedRecipes.sort((a, b) => {
          return b.id.localeCompare(a.id)
        });
      }
    }
    else {
      sortedRecipes.sort((a, b) => {
        return b.id.localeCompare(a.id)
      })
    }
    return sortedRecipes;
  };

  return (
    <>
      <ActivityIndicator visible={getRecipesApi.loading} />
      <Screen style={styles.screen}>
        {(getRecipesApi.error || filteredRecipes ? filteredRecipes.length === 0 : null) && (
          <>
            <AppText style={{ marginVertical: 15 }}>{getRecipesApi.error ? errorMessage : emptyMessage}</AppText>
            <Button title="Retry" onPress={handleRefresh} />
          </>
        )}

        <SorterFilter
          onCategoryFilterChange={
            (categoryFilter: any) => {
              setSelectedCategoryFilter(selectedCategoryFilter)
              onCategoryChange(categoryFilter)
            }}
          onSortChange={
            (sort: any) => {
              setSelectedSort(sort)
            }} />

        <FlatList
          numColumns={profilePage ? 2 : 1}
          data={getSortedRecipes()}
          keyExtractor={(recipe) => recipe.id.toString()}
          renderItem={({ item }) => {
            const showBookmark = item.bookmarkIds?.includes(user._id)

            const userName = users[item.userId]
            return (
              <View style={profilePage ? styles.slideContainer : null}>
                <Slide
                  profilePage={profilePage}
                  title={item.title}
                  subTitle={`~${item.timeToComplete} min`}
                  subTitle2={userName}
                  category={item.categoryIcon}
                  color={item.categoryColor}
                  imageUrl={item.images[0].url}
                  thumbnailUrl={item.images[0].thumbnailUrl}
                  onPress={() => navigation.navigate("RecipeDetails", item)}
                  showBookmark={showBookmark}
                  addLike={() => handleAddLike(item.id)}
                  addBookmark={() => handleAddBookmark(item.id)}
                  likesCount={item.likesCount}
                />
              </View>
            );
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
    backgroundColor: colors.light,
  },
  slideContainer: {
    flex: 1,
    margin: 8,

  },
});

export default RecipesScreen;
