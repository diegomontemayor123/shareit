import { useState } from "react";
import listingsApi from "../api/listings";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";



export default function useSubmitListing() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const {user} = useAuth()
  const location = useLocation()

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => {
        setProgress(progress);
      },user
    );
    
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  }
return{
  handleSubmit,
  uploadVisible,
  progress,
  setUploadVisible}
}

