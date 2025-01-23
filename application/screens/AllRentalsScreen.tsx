import React from "react";
import RentalsScreen from "./RentalsScreen";
import { useState } from "react";

function AllRentalsScreen({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };


  const filterAllRentals = (rentals: any[]) => {

    return rentals.filter((rental) => selectedCategory ? rental.categoryId == selectedCategory.value : rental)
  }


  return (
    <RentalsScreen
      filterFn={filterAllRentals}
      navigation={navigation}
      errorMessage="Couldn't retrieve the rentals."
      emptyMessage="No rentals available."
      onCategoryChange={handleCategoryChange}
    />
  );
}

export default AllRentalsScreen;
