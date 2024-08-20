import { useState } from "react";
import recipesApi from "../api/recipes";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";
import routes from "../navigation/routes";
import { Alert } from "react-native";

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

    const result = await recipesApi.addRecipe(
      { ...recipe, location },
      (progress: number) => {
        setProgress(progress);
      },
      user
    );
    console.log('result' + JSON.stringify(result))

    if (!result.ok) {
      setUploadVisible(false);
      resetForm()
      return Alert.alert("Could not save the recipe");
    }

    const { data: recipes } = await recipesApi.getRecipes();
    const updatedRecipe = recipes.find((r: { id: string }) => r.id === result.data._id);

    if (!updatedRecipe) {
      setUploadVisible(false);
      return Alert.alert("Could not fetch the updated recipe from the server");
    }
    resetForm();

    navigation.navigate(routes.RECIPE_DETAILS, updatedRecipe);
  };

  return {
    handleSubmit,
    uploadVisible,
    progress,
    setUploadVisible,
  };
}
