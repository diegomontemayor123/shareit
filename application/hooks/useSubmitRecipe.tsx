import { useState } from "react";
import recipesApi from "../api/recipes";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";
import routes from "../navigation/routes";
import { Alert } from "react-native";

interface Recipe {
  _id: string;
  title: string;
  time: number;
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
