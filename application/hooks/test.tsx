/*import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import { Form, FormField, FormPicker as Picker, SubmitButton } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import useSubmitRecipe from "../hooks/useSubmitRecipe";
import { categories, getCategoryLabelByValue } from "../config/categories";
import recipesApi from "../api/recipes";




const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    timeToComplete: Yup.number().required().min(1, "Please input at least one minute.").max(10000).label("Time to Complete"),
    ingredients: Yup.string().required().label("Ingredients"),
    description: Yup.string().required().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image."),
});

const editValidation = Yup.object().shape({
    images: Yup.array().min(1, "Please select at least one image."),
});

interface RecipeEditScreenProps {
    navigation: any;
    route: any
}
interface RecipeFormValues {
    name?: string
    title: string;
    timeToComplete: string;
    ingredients: string;
    description: string;
    category: any;
}
function RecipeEditScreen({ navigation, route }: RecipeEditScreenProps) {
    const { handleSubmit, uploadVisible, progress } = useSubmitRecipe({ navigation });
    const recipe = route.params


    const handleEdit = async (newRecipeInfo: any, { resetForm }: any) => {
        await recipesApi.editRecipe(recipe._id, newRecipeInfo)
        resetForm()
        navigation.goBack()
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Screen style={styles.container}>
                    <UploadScreen
                        progress={progress}
                        visible={uploadVisible}
                    />
                    <Form
                        initialValues={{
                            title: "",
                            timeToComplete: "",
                            ingredients: "",
                            description: "",
                            category: "",
                        } as RecipeFormValues}
                        onSubmit={recipe ? handleEdit : handleSubmit}
                        validationSchema={recipe ? editValidation : validationSchema}
                    >
                        <FormImagePicker name="images"
                            placeholderUrls={recipe?.images.map((image: any) => image.url || [])} />
                        <FormField
                            maxLength={255}
                            name="title"
                            placeholder={recipe?.title || "Title"}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <FormField
                            keyboardType="numeric"
                            maxLength={8}
                            name="timeToComplete"
                            placeholder={recipe ? recipe.timeToComplete.toString() + " min." : "Min. to complete"}
                            width={250}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <Picker
                            items={categories}
                            name="category"
                            numberOfColumns={3}
                            PickerItemComponent={CategoryPickerItem}
                            placeholder={getCategoryLabelByValue(recipe?.categoryId) || "Cuisine"}
                            width="50%"
                        />
                        <FormField
                            maxLength={1000}
                            multiline
                            name="ingredients"
                            numberOfLines={10}
                            placeholder={recipe?.ingredients || "Ingredients - Please separate each ingredient with a period '.'"}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <FormField
                            maxLength={1000}
                            multiline
                            name="description"
                            numberOfLines={10}
                            placeholder={recipe?.description || "Recipe - Please separate each step with a period '.'"}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <SubmitButton title={recipe ? "Done" : "Cook up"} />
                    </Form>
                </Screen>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default RecipeEditScreen;


import { useState } from "react";
import recipesApi from "../api/recipes";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";
import routes from "../navigation/routes";
import { Alert } from "react-native";

interface Recipe {
    _id: string;
    title: string;
    timeToComplete: number;
    categoryId: number;
    categoryIcon: string;
    categoryColor: string;
    description: string;
    userId: string
    likesCount: number;
    likerIds: string[];
    images: { fileName: string }[];
    location: {
        latitude: number;
        longitude: number;
    };
}

interface ApiResponse<T> {
    ok: boolean;
    data: T;
}

interface ApiErrorResponse {
    ok: false;
    error: string;
}

interface Props {
    navigation: any;
}
export default function useSubmitRecipe({ navigation }: Props) {
    const [uploadVisible, setUploadVisible] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const { user } = useAuth();
    const location = useLocation();

    const handleSubmit = async (recipe: any, { resetForm }: { resetForm: () => void }) => {
        setProgress(0);
        setUploadVisible(true);
        try {
            const result: ApiResponse<Recipe> | ApiErrorResponse = await recipesApi.addRecipe(
                { ...recipe, location },
                (progress: number) => {
                    setProgress(progress);
                },
                user
            ) as ApiResponse<Recipe>;
            if (!result.ok) {
                setUploadVisible(false);
                resetForm();
                console.log('Error: ' + JSON.stringify(result))
                return Alert.alert("Could not save the recipe");
            }
            const response: ApiResponse<Recipe[]> = await recipesApi.getRecipes() as ApiResponse<Recipe[]>;
            const recipes = response.data;
            const updatedRecipe = recipes.find((r) => r._id === result.data._id);

            if (!updatedRecipe) {
                setUploadVisible(false);
                resetForm();
                return Alert.alert("Could not fetch the updated recipe from the server");
            }
            resetForm();
            setUploadVisible(false);
            navigation.navigate(routes.RECIPE_DETAILS, updatedRecipe);
        } catch (error) {
            setUploadVisible(false);
            resetForm();
            Alert.alert("An unexpected error occurred");
        }
    };
    return {
        handleSubmit,
        uploadVisible,
        progress,
        setUploadVisible,
    };
}
    */