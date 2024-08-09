import React from "react";
import Listings from "./Listings";

function UsersListingsScreen({ navigation, route }) {
  const { userName } = route.params;

  const filterUserListings = (listings) => {
    return listings.filter((listing) => listing.userName === userName);
  };

  return (
    <Listings
      filterFn={filterUserListings}
      navigation={navigation}
      errorMessage="Could not retrieve the user's listings."
      emptyMessage="This user has no listings yet."
    />
  );
}

export default UsersListingsScreen;
