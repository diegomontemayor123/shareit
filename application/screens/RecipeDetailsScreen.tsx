import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from "react-native";
import RecipeImages from "../components/RecipeComponents/RecipeImages";
import RecipeHeader from "../components/RecipeComponents/RecipeHeader";
import RecipeDescription from "../components/RecipeComponents/RecipeDescription";
import useRecipeCount from "../hooks/useRecipeCount";
import Text from '../components/AppText'
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { getUserbyId } from "../api/users";
import recipesApi from "../api/recipes"

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Alert } from "react-native";
import routes from "../navigation/routes";

const { width } = Dimensions.get('window');
function RecipeDetailsScreen({ route, navigation }: any) {
  const recipeId = route.params._id
  const { user } = useAuth()
  const [recipeUser, setRecipeUser] = useState<{ [_id: string]: string }>({});
  const [recipe, setRecipe] = useState<any>(route.params);
  const recipeCount = useRecipeCount(recipe.userId);

  useEffect(() => {
    const fetchUsersandRecipe = async () => {
      const userData = await getUserbyId(recipe.userId);
      const response: any = await recipesApi.getRecipes() as any
      const updatedRecipe = response.data.find((r: any) => r._id === (recipeId));
      setRecipe(updatedRecipe)
      setRecipeUser(userData);
    };
    fetchUsersandRecipe();
  }, [recipeId, recipe.userId])


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
            navigation.navigate("Feed", { screen: "Recipes" })
          } catch (error) {
            alert("An unexpected error occurred.");
          }
        },
      },
      { text: "Cancel" }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <ScrollView>
        {user._id == recipeUser._id && (
          <View style={styles.Button}>
            <TouchableWithoutFeedback onPress={() => handleChange(recipe, navigation)} >
              <MaterialCommunityIcons name="cog" size={30} color={colors.light} />
            </TouchableWithoutFeedback>
          </View>
        )}
        <RecipeImages images={recipe.images} width={width} />
        <View style={styles.detailsContainer}>

          <RecipeHeader
            title={recipe.title}
            timeToComplete={recipe.timeToComplete}
            categoryIcon={recipe.categoryIcon}
            categoryColor={recipe.categoryColor}
            userId={recipe.userId}
            recipeCount={recipeCount}
            navigation={navigation}
          />
          <Text style={styles.header}>Ingredients</Text>
          <RecipeDescription description={recipe.ingredients} isIngredient />
          <Text style={styles.header}>Recipe</Text>
          <RecipeDescription description={recipe.description} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 15,
  },
  header: {
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10
  },
  Button: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default RecipeDetailsScreen;
