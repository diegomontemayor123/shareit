import { useState, useEffect } from "react";
import rentalsApi from "../api/rentals";

export default function useRentalCount(userId: string) {
  const [rentalCount, setRentalCount] = useState<number>(0);

  useEffect(() => {
    const fetchRentalCount = async () => {
      const result = await rentalsApi.getRentals();

      const rentals = result.data as any;

      if (result.ok) {
        const UserGear = rentals.filter((rental: any) => rental.userId === userId);
        setRentalCount(UserGear.length);
      } else {
        console.log("Failed to fetch rental count");
      }
    };
    fetchRentalCount();
  }, [userId]);

  return rentalCount;
}
