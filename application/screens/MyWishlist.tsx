import React from "react";

import MyGearScreen from "./MyGearScreen";
function MyWishlist({ navigation }: any) {
  return (
    <MyGearScreen navigation={navigation} isMyGear={false} />
  )


}
export default MyWishlist
