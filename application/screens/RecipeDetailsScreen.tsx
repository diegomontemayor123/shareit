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

const { width } = Dimensions.get('window');

function RecipeDetailsScreen({ route, navigation }: any) {
  const recipe = route.params;
  const recipeCount = useRecipeCount(recipe.userEmail);

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
          <Button title="Message" onPress={async () => {
            const result = await messagesApi.sendMessage(null, recipe._id);
            console.log('result ' + JSON.stringify(result.data))
            if (!result.ok) { return Alert.alert("Error", "Could not send the message.") }
            navigation.navigate(routes.CHATSCREEN, result.data)
          }
          } />
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
