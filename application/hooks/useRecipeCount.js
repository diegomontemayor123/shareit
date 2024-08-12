import { useState, useEffect } from "react";
import recipesApi from "../api/recipes";


export default function useRecipeCount(userEmail) {

 const [recipeCount,setRecipeCount]= useState(0)

 useEffect(()=>{
  const fetchRecipeCount= async ()=>{
    const result = await recipesApi.getRecipes()
    
    if (result.ok){
      const userRecipes=result.data.filter(
        (recipe)=>recipe.userEmail === userEmail
      )
      setRecipeCount(userRecipes.length)
    }else{
      console.log("Failed to fetch recipe count")
    }
  }
fetchRecipeCount()

 },[userEmail])

 return recipeCount
}