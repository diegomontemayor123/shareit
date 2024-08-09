import React from "react";
import Listings from "./Listings";
import useAuth from "../auth/useAuth";

function MyListingsScreen({ navigation }) {
  const { user } = useAuth();

  const filterMyListings = (listings) => {
    return listings.filter((listing) => listing.userName === user.name);
  };

  return (
    <Listings
      filterFn={filterMyListings}
      navigation={navigation}
      errorMessage="Could not retrieve your listings."
      emptyMessage="You don't have any listings yet."
    />
  );
}

export default MyListingsScreen;
