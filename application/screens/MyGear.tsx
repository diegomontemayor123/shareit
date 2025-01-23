import React from "react";

import MyRentalsScreen from "./MyRentalsScreen";
function MyCookBook({ navigation }: any) {
  return (
    <MyRentalsScreen navigation={navigation} isMyRentals={false} />
  )


}
export default MyCookBook
