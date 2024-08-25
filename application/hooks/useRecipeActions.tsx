import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import recipesApi from "../api/recipes";
import useApi from './useApi';
import useAuth from '../auth/useAuth';

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

  const handleDelete = (id: number) => {
    Alert.alert("Delete", "Are you sure you want to delete this recipe?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const result = await recipesApi.deleteRecipe(id);
            if (!result.ok) {
              alert("Could not delete the recipe.");
              return;
            }
            setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== id));
          } catch (error) {
            alert("An unexpected error occurred.");
          }
        },
      },
      { text: "No" },
    ]);
  };

  const handleAddLike = async (id: number) => {
    const userEmail = user.email;
    const result = await recipesApi.addLike(id, userEmail);
    const data = result.data as any;

    if (result.ok) {
      if (data.alreadyLiked) {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, likesCount: recipe.likesCount - 1, likerEmails: [...recipe.likerEmails, userEmail] } : recipe))
      } else {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, likesCount: recipe.likesCount + 1, likerEmails: [...recipe.likerEmails, userEmail] } : recipe));
      }
    } else {
      alert('Error adding like.');
    }
  };

  return {
    handleAddLike,
    handleDelete,
    handleRefresh,
    refreshing,
    filteredRecipes,
  };
}
