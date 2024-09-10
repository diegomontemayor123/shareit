import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions, FlatList, Modal } from "react-native";
import RecipeImages from "../components/RecipeComponents/RecipeImages";
import RecipeHeader from "../components/RecipeComponents/RecipeHeader";
import RecipeDescription from "../components/RecipeComponents/RecipeDescription";
import useRecipeCount from "../hooks/useRecipeCount";
import Text from '../components/AppText'
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getUserbyId } from "../api/users";
import recipesApi from "../api/recipes"
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Alert } from "react-native";
import { FormField, Form, SubmitButton } from "../components/forms";
import { ListItem, ListItemSeparator, ListItemDeleteAction } from "../components/lists";
import Avatar from "../components/Avatar";
import AppButton from "../components/Button";
import Screen from "../components/Screen"
import { useRef } from 'react';


const { width } = Dimensions.get('window');
function RecipeDetailsScreen({ route, navigation }: any) {
  const recipeId = route.params._id
  const { user } = useAuth()
  const [recipeUser, setRecipeUser] = useState<{ [_id: string]: string }>({});
  const [recipe, setRecipe] = useState<any>(route.params);
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const [showComments, setShowComments] = useState<any>({});
  const recipeCount = useRecipeCount(recipe.userId);
  const yourRef = useRef<any>(null)

  const fetchUsersandRecipe = async () => {
    const userData = await getUserbyId(recipe.userId);
    const response: any = await recipesApi.getRecipes() as any;
    const updatedRecipe = response.data.find((r: any) => r._id === recipeId);
    setRecipe(updatedRecipe);
    setRecipeUser(userData);

    const userIds = new Set<string>();
    recipe.comments.forEach((comment: any) => {
      userIds.add(comment.user);
    });

    const details: { [key: string]: any } = {};
    for (const _id of userIds) {
      const userData = await getUserbyId(_id);
      details[_id] = userData;
    }
    setUserDetails(details);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsersandRecipe();
    }, [recipeId, recipe.userId])
  );

  const handleChange = (item: any, navigation: any) => {
    Alert.alert("Edit Recipe", "How would you like to change this recipe?", [
      {
        text: "Edit Recipe",
        onPress: async () => {
          try {
            navigation.navigate("Edit", item)
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

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    const result = await recipesApi.addComment(recipeId, user._id, values.comment)

    if (result.ok) {
      await fetchUsersandRecipe()
      resetForm()
    }
    else {
      Alert.alert("Could not post comment.")
      resetForm()
    }
  };

  const handleDelete = async (_id: any, commentId: string) => {
    try {
      const result = await recipesApi.deleteComment(_id, commentId);
      fetchUsersandRecipe()
      if (!result.ok) {
        alert("Could not delete message.");
        return
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    }
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


          <Text style={styles.header}>Comments</Text>
          <AppButton title="Show Comments" onPress={() => setShowComments(true)} />
        </View>
      </ScrollView>

      <Modal visible={showComments} animationType="slide"><Screen>
        <View style={{ padding: 15 }}>
          <TouchableWithoutFeedback onPress={() => setShowComments(false)}>
            <MaterialCommunityIcons name="close" size={30} />
          </TouchableWithoutFeedback>
        </View>

        <FlatList data={recipe.comments}
          keyExtractor={(comment) => `${comment._id}`}
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd()}
          onLayout={() => yourRef.current.scrollToEnd()}
          renderItem={({ item }) => {
            const displayUser = userDetails[item.user] || { name: '', images: { url: null, thumbnailUrl: null } };
            return (
              <ListItem
                title={displayUser.name}
                subTitle={item.message}
                onPress={() => {
                  navigation.navigate(
                    "Feed", {
                    screen: 'Users Recipes',
                    params: { userId: item.user },
                  });
                  setShowComments(false)
                }}

                renderRightActions={() => (
                  <ListItemDeleteAction onPress={() => handleDelete(recipe._id, item._id)} />
                )}

                IconComponent={
                  <Avatar
                    firstName={displayUser.name.split(" ")[0]}
                    lastName={displayUser.name.split(" ")[1] || ""}
                    size={55}
                    imageUrl={displayUser.images?.url || null}
                    thumbnailUrl={displayUser.images?.thumbnailUrl || null}
                  />
                }



              />
            );
          }}
          ItemSeparatorComponent={ListItemSeparator}


        />
        <View style={{ padding: 10 }}>
          <Text style={styles.header}>Add Comment</Text>
          <Form initialValues={{ comment: '' }} onSubmit={handleSubmit}>
            <FormField autoCorrect={true} icon="comment" name="comment"
              placeholder="Type a comment here." blurOnSubmit={true} />
            <SubmitButton title="Post Comment" />
          </Form></View>
      </Screen></Modal>





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
