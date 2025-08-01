import { useState } from "react";
import rentalsApi from "../api/rentals";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";
import { Alert } from "react-native";

export default function useSubmitRental({ navigation }: any) {
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { user } = useAuth();
  const location = useLocation();

  const handleSubmit = async (rental: any, { resetForm }: any, rentalId?: string) => {
    setProgress(0);
    setUploadVisible(true);
    try {

      let result: any
      if (rentalId) {
        await rentalsApi.editRental(rentalId, { ...rental, location },
          (progress: number) => { setProgress(progress) }) as any
      } else {
        result = await rentalsApi.addRental({ ...rental, location },
          (progress: number) => { setProgress(progress) }, user) as any
      }
      resetForm();
      setUploadVisible(false);
      const response: any = await rentalsApi.getRentals() as any
      const updatedRental = response.data.find((r: any) => r._id === (rentalId || result.data._id));
      console.log('updatedRental ', updatedRental)
      if (!updatedRental) {
        return Alert.alert("Could not fetch the updated rental from the server");
      }
      navigation.navigate("RentalDetails", updatedRental);
    } catch (error) {
      setUploadVisible(false);
      resetForm();
      console.log(error)
      Alert.alert("An unexpected error occurred");
    }
  };

  return {
    handleSubmit,
    uploadVisible,
    progress,
    setUploadVisible,
  };
}
