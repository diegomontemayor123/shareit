import React from "react";
import Listings from "./Listings";

function ListingsScreen({ navigation }) {
  const filterAllListings = (listings) => listings;

  return (
    <Listings
      filterFn={filterAllListings}
      navigation={navigation}
      errorMessage="Couldn't retrieve the listings."
      emptyMessage="No listings available."
    />
  );
}

export default ListingsScreen;
