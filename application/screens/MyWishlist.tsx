import React from "react";

import MyRentalsScreen from "./MyRentalsScreen";
function MyWishlist({ navigation }: any) {
  return (
    <MyRentalsScreen navigation={navigation} isMyRentals={false} />
  )


}
export default MyWishlist
