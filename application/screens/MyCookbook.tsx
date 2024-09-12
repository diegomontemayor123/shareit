import React from "react";

import MyRecipesScreen from "./MyRecipesScreen";
function MyCookBook({ navigation }: any) {
  return (
    <MyRecipesScreen navigation={navigation} isMyRecipes={false} />
  )


}
export default MyCookBook
