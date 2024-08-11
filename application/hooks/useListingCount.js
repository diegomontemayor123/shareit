import { useState, useEffect } from "react";
import listingsApi from "../api/listings";


export default function useListingCount(userEmail) {

 const [listingCount,setListingCount]= useState(0)

 useEffect(()=>{
  const fetchListingCount= async ()=>{
    const result = await listingsApi.getListings()
    
    if (result.ok){
      const userListings=result.data.filter(
        (listing)=>listing.userEmail === userEmail
      )
      setListingCount(userListings.length)
    }else{
      console.log("Failed to fetch listing count")
    }
  }
fetchListingCount()

 },[userEmail])

 return listingCount
}