import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import recipesApi from "../api/recipes";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import useRecipeActions from "../hooks/useRecipeActions";

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
}

function Recipes({
  filterFn,
  errorMessage,
  emptyMessage,
  navigation,
}: RecipesProps) {
  const {
    handleAddLike,
    handleDelete,
    handleRefresh,
    refreshing,
    filteredRecipes,
  } = useRecipeActions(filterFn);
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const { user } = useAuth();

  useEffect(() => {
    getRecipesApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getRecipesApi.loading} />
      <Screen style={styles.screen}>
        {(getRecipesApi.error || filteredRecipes ? filteredRecipes.length === 0 : null) && (
          <>
            <AppText>{getRecipesApi.error ? errorMessage : emptyMessage}</AppText>
            <Button title="Retry" onPress={getRecipesApi.request} />
          </>
        )}
        <FlatList
          data={filteredRecipes}
          keyExtractor={(recipe) => recipe.id.toString()}
          renderItem={({ item }) => {
            const showDeleteButton = item.userEmail === user.email;
            return (
              <Card
                title={item.title}
                subTitle={`~${item.time} hrs`}
                subTitle2={item.userName}
                category={item.categoryIcon}
                color={item.categoryColor}
                imageUrl={item.images[0].url}
                onPress={() => navigation.navigate(routes.RECIPE_DETAILS, item)}
                thumbnailUrl={item.images[0].thumbnailUrl}
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
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default Recipes;
