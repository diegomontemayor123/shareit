import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Slide from "../components/Slide";
import colors from "../config/colors";
import recipesApi from "../api/recipes";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import useRecipeActions from "../hooks/useRecipeActions";
import SorterFilter from "../components/SorterFilter";

interface Recipe {
  id: number;
  title: string;
  time: string;
  userName: string;
  categoryIcon: string;
  categoryColor: string;
  images: { url: string; thumbnailUrl: string }[];
  userEmail: string;
  likesCount: number;
}

interface RecipesProps {
  filterFn: (recipes: Recipe[]) => Recipe[];
  errorMessage: string;
  emptyMessage: string;
  navigation: any;
  onCategoryChange: any
}

function RecipesScreen({ filterFn, errorMessage, emptyMessage, navigation, onCategoryChange }: RecipesProps) {
  const { handleAddLike, handleDelete, handleRefresh, refreshing, filteredRecipes } = useRecipeActions(filterFn);
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const { user } = useAuth();

  const [selectedSort, setSelectedSort] = useState<any>()
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<any>()

  useEffect(() => {
    getRecipesApi.request();
  }, []);

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
            <AppText>{getRecipesApi.error ? errorMessage : emptyMessage}</AppText>
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
          data={getSortedRecipes()}
          keyExtractor={(recipe) => recipe.id.toString()}
          renderItem={({ item }) => {
            const showDeleteButton = item.userEmail === user.email;
            return (
              <Slide
                title={item.title}
                subTitle={`~${item.time} hrs`}
                subTitle2={item.userName}
                category={item.categoryIcon}
                color={item.categoryColor}
                imageUrl={item.images[0].url}
                thumbnailUrl={item.images[0].thumbnailUrl}
                onPress={() => navigation.navigate(routes.RECIPE_DETAILS, item)}
                onDelete={() => handleDelete(item.id)}
                showDeleteButton={showDeleteButton}
                addLike={() => handleAddLike(item.id)}
                likesCount={item.likesCount}
              />
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
});

export default RecipesScreen;
