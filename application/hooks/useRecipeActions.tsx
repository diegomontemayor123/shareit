import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'
import recipesApi from "../api/recipes";
import useApi from './useApi';
import useAuth from '../auth/useAuth';

type FilterFn = (recipes: any[]) => any[];

export default function useRecipeActions(filterFn: FilterFn) {
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const { user } = useAuth();
  const route = useRoute()

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



  const handleAddLike = async (id: number) => {
    const result = await recipesApi.addLike(id, user._id);
    const data = result.data as any;

    if (result.ok) {
      if (data.alreadyLiked) {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, likesCount: recipe.likesCount - 1, likerIds: recipe.likerIds.filter((likerId: any) => likerId !== user._id) } : recipe))
      } else {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, likesCount: recipe.likesCount + 1, likerIds: [...recipe.likerIds, user._id] } : recipe));
      }
    } else {
      alert('Error adding like.');
    }
  };

  const handleAddBookmark = async (id: number) => {
    const result = await recipesApi.addBookmark(id, user._id)
    const data = result.data as any

    if (result.ok) {
      if (data.alreadyBookmarked) {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, bookmarkIds: recipe.bookmarkIds.filter((bookmarkId: any) => bookmarkId !== user._id) } : recipe))
        if (route.name === 'Cookbook') {
          setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== id))
        }
      } else {
        setFilteredRecipes(filteredRecipes.map(recipe =>
          recipe.id === id ? { ...recipe, bookmarkIds: [...recipe.bookmarkIds, user._id] } : recipe))
      }
    } else {
      alert('Error bookmarking recipe.')
    }

  }

  return {
    handleAddLike,
    handleAddBookmark,
    handleRefresh,
    refreshing,
    filteredRecipes,
  };
}
