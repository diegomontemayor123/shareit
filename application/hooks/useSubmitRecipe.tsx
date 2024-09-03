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



interface Props {
  navigation: any;
}
export default function useSubmitRecipe({ navigation }: Props) {
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { user } = useAuth();
  const location = useLocation();

  const handleSubmit = async (recipe: any, { resetForm }: { resetForm: () => void }, recipeId?: string) => {
    setProgress(0);
    setUploadVisible(true);
    try {
      let result: any
      if (recipeId) {
        result = await recipesApi.editRecipe(recipeId, { ...recipe, location }, (progress: number) => { setProgress(progress) }) as any
      } else {
        result = await recipesApi.addRecipe({ ...recipe, location },
          (progress: number) => { setProgress(progress) }, user) as any
      }
      if (result && !result.ok) {
        setUploadVisible(false);
        resetForm();
        return Alert.alert("Could not save the recipe");
      }
      resetForm();
      setUploadVisible(false);
      const response: any = await recipesApi.getRecipes() as any
      const updatedRecipe = response.data.find((r: any) => r._id === (recipeId || result.data._id));
      if (!updatedRecipe) {
        return Alert.alert("Could not fetch the updated recipe from the server");
      }

      navigation.navigate(routes.RECIPE_DETAILS, result);
    } catch (error) {
      setUploadVisible(false);
      resetForm();
      console.log(error)
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
