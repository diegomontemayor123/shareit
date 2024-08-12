import React from "react";
import { View,  StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from "react-native";
import RecipeImages from "../components/RecipeComponents/RecipeImages";
import RecipeHeader from "../components/RecipeComponents/RecipeHeader";
import RecipeDescription from "../components/RecipeComponents/RecipeDescription";
import ContactForm from '../components/forms/Contactform'
import useRecipeCount from "../hooks/useRecipeCount";
import Text from '../components/Text'



const { width } = Dimensions.get('window');

function RecipeDetailsScreen({ route, navigation }) {
  const recipe = route.params;
  const recipeCount = useRecipeCount(recipe.userEmail);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}>
      <ScrollView>
        <RecipeImages images={recipe.images} width={width} />
        <View style={styles.detailsContainer}>
          <RecipeHeader
            title={recipe.title}
            time={recipe.time}
            categoryIcon={recipe.categoryIcon}
            categoryColor={recipe.categoryColor}
            userName={recipe.userName}
            recipeCount={recipeCount}
            navigation={navigation}
            userEmail={recipe.userEmail}
          />
          <Text style={styles.header}>Recipe</Text>
          <RecipeDescription description={recipe.description} />
          <Text style={styles.header}>Send Message</Text>
          <ContactForm recipe={recipe} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  header: {
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 20,
  },
});

export default RecipeDetailsScreen;