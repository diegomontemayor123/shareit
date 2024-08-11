import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

function Listings({filterFn, errorMessage, emptyMessage, navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const [filteredListings,setFilteredListings]=useState([])
  const [refreshing, setRefreshing] = useState(false); 
  const { user } = useAuth();

  useEffect(() => {
    getListingsApi.request();
  }, []);

  useEffect(()=>{
const filtered= filterFn(getListingsApi.data)
setFilteredListings(filtered)
}, [getListingsApi.data,filterFn])

const handleRefresh = async () => {
    setRefreshing(true);  // Start refreshing
    await getListingsApi.request();  // Re-fetch data
    setRefreshing(false);  // End refreshing
  };

  const handleDelete = async (id) => {
    const result = await listingsApi.deleteListing(id);
    if (!result.ok) return alert("Could not delete the listing.");
    setFilteredListings(filteredListings.filter(listing => listing.id !== id));
  };

  return (
<>
    <ActivityIndicator visible={getListingsApi.loading} />
    <Screen style={styles.screen}>
    {(getListingsApi.error || filteredListings.length === 0) && (
        <>
          <AppText>{getListingsApi.error ? errorMessage : emptyMessage}</AppText>
          <Button title="Retry" onPress={getListingsApi.request} />
        </>
      )}

      <FlatList
        data={filteredListings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => {
          const showDeleteButton = item.userEmail === user.email;
          return(
          <Card
            title={item.title}
            subTitle={"~"+item.time+" hrs"}
            subTitle2={item.userName}
            category={item.categoryIcon}
            color={item.categoryColor}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={item.images[0].thumbnailUrl}
            onDelete={() => handleDelete(item.id)}
            showDeleteButton={showDeleteButton}
          />
        )}}
        refreshing={refreshing}  // Pass refreshing state
        onRefresh={handleRefresh}
      />
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default Listings;