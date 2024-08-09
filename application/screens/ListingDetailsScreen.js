import React from "react";
import { View,  StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import {Image} from 'react-native-expo-image-cache'
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ContactSellerForm from "../components/forms/Contactsellerform";
import { Platform } from "react-native";
import InitialsAvatar from "../components/InitialsAvatar";
import { useState, useEffect } from "react";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "../components/Icon";





function ListingDetailsScreen({ route, navigation }) {
 const listing = route.params;
 const [listingCount,setListingCount]= useState(0)

 useEffect(()=>{
  const fetchListings= async ()=>{
    const result = await listingsApi.getListings()
 
    if (result.ok){
      const userListings=result.data.filter(
        (example)=>example.userEmail === listing.userEmail
      )
      setListingCount(userListings.length)
    }else{
      console.log("Failed to fetch listing count")
    }
  }
fetchListings()

 },[listing.userEmail])


 return (
   <KeyboardAvoidingView
   behavior="position"
   keyboardVerticalOffset={Platform.OS==="ios" ? 0:100}>
    <ScrollView>
     <Image style={styles.image} preview={{uri:listing.images[0].thumbnailUrl}} tint='light' uri={listing.images[0].url} />
     <View style={styles.detailsContainer}>
      <View style={styles.titleContainer}>
       <Text style={styles.title}>{listing.title}</Text>
       <Icon
          backgroundColor={listing.categoryColor}
          name={listing.categoryIcon}
          size={35}
        />
       </View>
       <Text style={styles.price}>~{listing.price} hrs</Text>
       <View style={styles.userContainer}>
         <ListItem
           IconComponent={ <InitialsAvatar
            firstName={listing.userName.split(" ")[0]} // Extract first name
            lastName={listing.userName.split(" ")[1] || ""} // Extract last name
            size={55}
          />}
           title={listing.userName}
           onPress={()=>navigation.navigate(routes.USERSLISTINGSSCREEN, { userName: listing.userName })}
           subTitle={listingCount === 1 ? `${listingCount} Recipe` : `${listingCount} Recipes`}
         />
       </View>

       <View style={styles.description}>
       <Text >   {listing.description}</Text>
       </View>
       <ContactSellerForm listing={listing}/>
     </View>
     </ScrollView>
   </KeyboardAvoidingView>
 );
}


const styles = StyleSheet.create({
 detailsContainer: {
   padding: 20,
 },
 description:{
marginVertical: 20,
backgroundColor: colors.light,
borderRadius: 25,
borderColor: colors.dark,
borderWidth: 0
 },
 image: {
   width: "100%",
   height: 300,
 },
 price: {
   color: colors.secondary,
   fontWeight: "bold",
   fontSize: 20,
   marginVertical: 10,
 },
 titleContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
 title: {
   fontSize: 24,
   fontWeight: "500",
 },
 userContainer: {
   marginVertical: 0,
 },
});


export default ListingDetailsScreen;