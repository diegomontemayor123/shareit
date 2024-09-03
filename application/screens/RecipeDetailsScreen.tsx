import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from "react-native";
import RecipeImages from "../components/RecipeComponents/RecipeImages";
import RecipeHeader from "../components/RecipeComponents/RecipeHeader";
import RecipeDescription from "../components/RecipeComponents/RecipeDescription";
import useRecipeCount from "../hooks/useRecipeCount";
import Text from '../components/AppText'
import Button from '../components/Button'
import messagesApi from '../api/messages'
import { Alert } from "react-native";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { getUserbyId } from "../api/users";

const { width } = Dimensions.get('window');

function RecipeDetailsScreen({ route, navigation }: any) {
  const recipe = route.params;
  const recipeCount = useRecipeCount(recipe.userId);
  const { user } = useAuth()

  const [recipeUser, setRecipeUser] = useState<{ [_id: string]: string }>({});
  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getUserbyId(recipe.userId);
      setRecipeUser(userData);
    };
    fetchUsers();
  }, [recipe])

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <ScrollView>
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
          <Button title="Message" onPress={async () => {
            const result = await messagesApi.sendMessage(null, recipe._id, user._id, recipeUser._id);
            console.log("Error", result);
            if (!result.ok) { return Alert.alert("Error", "Could not send the message.") }
            navigation.navigate(routes.CHATSCREEN, result.data)
          }
          } />
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
});

export default RecipeDetailsScreen;
