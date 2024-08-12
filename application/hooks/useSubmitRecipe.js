import { useState, useEffect } from "react";
import recipesApi from "../api/recipes";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";
import routes from "../navigation/routes";



export default function useSubmitRecipe({navigation}) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const {user} = useAuth()
  const location = useLocation()

  const handleSubmit = async (recipe, { resetForm }) => {
    
    setProgress(0);
    setUploadVisible(true);
    
    const result = await recipesApi.addRecipe(
      { ...recipe, location },
      (progress) => {
        setProgress(progress);
      },user
    );
    
    if (!result.ok) {
      
      setUploadVisible(false);
      return alert("Could not save the recipe");
    }
   
    const { data: recipes } = await recipesApi.getRecipes();
    const updatedRecipe = recipes.find(r => r.id === result.data._id);

    if (!updatedRecipe) {
      setUploadVisible(false);
      return alert("Could not fetch the updated recipe from the server");
    }
    resetForm();    
    navigation.navigate(routes.RECIPE_DETAILS, updatedRecipe)

  }
return{
  handleSubmit,
  uploadVisible,
  progress,
  setUploadVisible}
}

