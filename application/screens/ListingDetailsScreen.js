import React from "react";
import { View,  StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from "react-native";
import ListingImages from "../components/ListingComponents/ListingImages";
import ListingHeader from "../components/ListingComponents/ListingHeader";
import ListingDescription from "../components/ListingComponents/ListingDescription";
import ContactForm from '../components/forms/Contactform'
import useListingCount from "../hooks/useListingCount";
import Text from '../components/Text'



const { width } = Dimensions.get('window');

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const listingCount = useListingCount(listing.userEmail);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}>
      <ScrollView>
        <ListingImages images={listing.images} width={width} />
        <View style={styles.detailsContainer}>
          <ListingHeader
            title={listing.title}
            price={listing.price}
            categoryIcon={listing.categoryIcon}
            categoryColor={listing.categoryColor}
            userName={listing.userName}
            listingCount={listingCount}
            navigation={navigation}
            userEmail={listing.userEmail}
          />
          <Text style={styles.header}>Recipe</Text>
          <ListingDescription description={listing.description} />
          <Text style={styles.header}>Send Message</Text>
          <ContactForm listing={listing} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  header: {
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 20,
  },
});

export default ListingDetailsScreen;