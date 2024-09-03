import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import recipesApi from "../api/recipes";
import useApi from './useApi';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';

type FilterFn = (recipes: any[]) => any[];

export default function useRecipeActions(filterFn: FilterFn) {
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getRecipesApi.request();
  }, []);

  useEffect(() => {
    if (getRecipesApi.data) {
      const filtered = filterFn(getRecipesApi.data as any);
      setFilteredRecipes(filtered);
    }
  }, [getRecipesApi.data, filterFn]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getRecipesApi.request();
    setRefreshing(false);
  };

  const handleChange = (item: any, navigation: any) => {
    Alert.alert("Edit Recipe", "How would you like to change this recipe?", [
      {
        text: "Edit Recipe",
        onPress: async () => {
          try {
            navigation.navigate(routes.RECIPE_EDIT, item)
          } catch (error) {
            alert("An unexpected error occurred.");
          }
        },
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const result = await recipesApi.deleteRecipe(item.id);
            if (!result.ok) {
              alert("Could not delete the recipe.");
              return;
            }
            setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== item.id));
          } catch (error) {
            alert("An unexpected error occurred.");
          }
        },
      },
      { text: "Cancel" }
    ]);
  };

  const handleAddLike = async (id: number) => {
    const result = await recipesApi.addLike(id, user._id);
    const data = result.data as any;

    if (result.ok) {
      if (data.alreadyLiked) {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, likesCount: recipe.likesCount - 1, likerIds: [...recipe.likerIds, user._id] } : recipe))
      } else {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, likesCount: recipe.likesCount + 1, likerIds: [...recipe.likerIds, user._id] } : recipe));
      }
    } else {
      alert('Error adding like.');
    }
  };

  return {
    handleAddLike,
    handleChange,
    handleRefresh,
    refreshing,
    filteredRecipes,
  };
}
