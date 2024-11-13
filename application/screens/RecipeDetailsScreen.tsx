import React, { useState, useRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions, FlatList, Modal, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RecipeImages from "../components/RecipeComponents/RecipeImages";
import RecipeHeader from "../components/RecipeComponents/RecipeHeader";
import RecipeDescription from "../components/RecipeComponents/RecipeDescription";
import Text from '../components/AppText';
import { FormField, Form, SubmitButton } from "../components/forms";
import { Entry, EntrySeparator, EntryDeleteAction } from "../components/entries";
import Avatar from "../components/Avatar";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import useRecipeCount from "../hooks/useRecipeCount";
import { getUserbyId, followUser } from "../api/users";
import recipesApi from "../api/recipes";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../config/colors";
import messagesApi from "../api/messages";

const { width } = Dimensions.get('window');
function RecipeDetailsScreen({ route, navigation }: any) {
  const recipeId = route.params._id
  const { user } = useAuth()
  const [updatedUser, setUpdatedUser] = useState<any>({})
  const [recipeUser, setRecipeUser] = useState<{ [_id: string]: string }>({});
  const [recipe, setRecipe] = useState<any>(route.params);
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFollow, setShowFollow] = useState<boolean>(false);
  const recipeCount = useRecipeCount(recipe.userId);
  const scrollRef = useRef<any>(null)

  const fetchCommentUsersandRecipe = async () => {
    const userData = await getUserbyId(recipe.userId);
    const updatedUserData = await getUserbyId(user._id)
    const response: any = await recipesApi.getRecipes() as any;
    const updatedRecipe = response.data.find((r: any) => r._id === recipeId);
    setRecipe(updatedRecipe);
    setRecipeUser(userData);
    setUpdatedUser(updatedUserData)

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

  const fetchFollowIds = async () => {
    const userIds = new Set<string>();
    updatedUser.following.forEach((follow: any) => {
      userIds.add(follow);
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
      fetchCommentUsersandRecipe();
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
              return alert("Could not delete the recipe.");
            }
            navigation.navigate("Recipes")
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
      await fetchCommentUsersandRecipe()
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
      fetchCommentUsersandRecipe()
      if (!result.ok) {
        return alert("Could not delete message.");
      }
    } catch (error) { alert("An unexpected error occurred."); }
  };

  const handleFollow = async (id: any) => {
    try {
      await followUser(user._id, id);
    } catch (error) {
      alert('Error following user.');
    }
  }

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
        <View style={styles.bottomButton}>
          <TouchableWithoutFeedback onPress={
            () => {
              fetchFollowIds()
              setShowModal(true)
              setShowFollow(true)
            }
          }>
            <MaterialCommunityIcons name="share" size={30} color={colors.light} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{ marginLeft: 5 }} onPress={
            () => {
              fetchCommentUsersandRecipe()

              setShowModal(true)
              setShowFollow(false)
            }} >
            <MaterialCommunityIcons name="comment" size={30} color={colors.light} />
          </TouchableWithoutFeedback>
        </View>

        <RecipeImages images={recipe.images} width={width} />
        <View style={styles.detailsContainer}>

          <RecipeHeader
            recipeCount={recipeCount}
            navigation={navigation}
            recipe={recipe}
          />
          <Text style={styles.header}>Ingredients</Text>
          <RecipeDescription description={recipe.ingredients} isIngredient />
          <Text style={styles.header}>Recipe</Text>
          <RecipeDescription description={recipe.description} />
        </View></ScrollView>

      <Modal visible={showModal} animationType="slide"><Screen>
        <View style={{ padding: 15 }}>
          <TouchableWithoutFeedback onPress={() => {
            setShowModal(false)

          }}>
            <MaterialCommunityIcons name="close" size={30} />
          </TouchableWithoutFeedback></View>

        <FlatList data={showFollow ? Object.values(userDetails) : recipe.comments}
          keyExtractor={(comment) => `${comment._id}`}
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current.scrollToEnd()}
          onLayout={() => scrollRef.current.scrollToEnd()}
          renderItem={({ item }) => {
            const displayUser = showFollow ? item : userDetails[item.user];
            if (!displayUser) return null
            return (
              <Entry
                title={displayUser.name}
                icon3={"share"}
                icon3Function={
                  async () => {
                    const result = await messagesApi.sendMessage(`${recipe.title} by ${recipeUser.name}`, user._id, displayUser._id, recipe, null) as any;
                    if (!result.ok) { return Alert.alert("Error", "Could not send the message.") }
                    navigation.navigate(
                      "Chat", { ...result.data } as any,
                    )
                    setShowModal(false)
                  }
                }
                icon2={displayUser._id != user._id ? "plus-box-multiple-outline" : null}
                icon2Function={() => {
                  handleFollow(displayUser._id)
                  fetchCommentUsersandRecipe()
                }}
                icon2Color={updatedUser.following &&
                  updatedUser.following.includes(displayUser._id) ? "green" : null}
                subTitle={showFollow ? null : item.message}
                onPress={() => {
                  navigation.navigate(

                    'Users Recipes',
                    { userId: item.user },
                  );
                  setShowModal(false)

                }}
                renderRightActions={showFollow || (item.user != user._id && user._id != recipe.userId) ? () => null : () => (
                  <EntryDeleteAction onPress={() => handleDelete(recipe._id, item._id)} />
                )}
                IconComponent={
                  <Avatar
                    firstName={displayUser.name.split(" ")[0]}
                    lastName={displayUser.name.split(" ")[1] || ""}
                    size={55}
                    imageUrl={displayUser.images?.url || null}
                    thumbnailUrl={displayUser.images?.thumbnailUrl || null}
                  />} />);
          }}
          ItemSeparatorComponent={EntrySeparator} />

        {!showFollow &&
          <View style={{ padding: 10 }}>
            <Text style={styles.header}>Add Comment</Text>
            <Form initialValues={{ comment: '' }} onSubmit={handleSubmit}>
              <FormField autoCorrect={true} icon="comment" name="comment"
                placeholder="Type a comment here." blurOnSubmit={true} />
              <SubmitButton title="Post Comment" />
            </Form></View>}
      </Screen></Modal>
    </KeyboardAvoidingView>
  )
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
  bottomButton: {
    position: 'absolute',
    top: 255,
    right: 10,
    zIndex: 1,
    flexDirection: "row",

  },
});

export default RecipeDetailsScreen;
