import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import recipesApi from "../api/recipes";
import useApi from './useApi';

const useRecipeActions = (filterFn) => {
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    getRecipesApi.request();
  }, []);

  useEffect(()=>{
const filtered= filterFn(getRecipesApi.data)
setFilteredRecipes(filtered)
}, [getRecipesApi.data,filterFn])

  const handleRefresh = async () => {
    setRefreshing(true);
    await getRecipesApi.request();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
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

  const handleAddLike = async (id) => {
    const result = await recipesApi.addLike(id);
    if (result.ok) {
      setFilteredRecipes(filteredRecipes.map(recipe =>
        recipe.id === id ? { ...recipe, likesCount: recipe.likesCount + 1 } : recipe
      ));
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
};

export default useRecipeActions;
