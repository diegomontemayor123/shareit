import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'
import rentalsApi from "../api/rentals";
import useApi from './useApi';
import useAuth from '../auth/useAuth';

export default function useRentalActions(filterFn?: any) {
  const getRentalsApi = useApi(rentalsApi.getRentals);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filteredRentals, setFilteredRentals] = useState<any[]>([]);
  const { user } = useAuth();
  const route = useRoute()

  useEffect(() => {
    getRentalsApi.request();
  }, []);

  useEffect(() => {
    if (getRentalsApi.data) {
      const filtered = filterFn(getRentalsApi.data as any);
      setFilteredRentals(filtered);
    }
  }, [getRentalsApi.data, filterFn]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getRentalsApi.request();
    setRefreshing(false);
  };



  const handleAddLike = async (id: number) => {
    const result = await rentalsApi.addLike(id, user._id);
    const data = result.data as any;

    if (result.ok) {
      if (data.alreadyLiked) {
        setFilteredRentals(filteredRentals.map(rental =>
          rental.id === id ? { ...rental, likesCount: rental.likesCount - 1, likerIds: rental.likerIds.filter((likerId: any) => likerId !== user._id) } : rental))
      } else {
        setFilteredRentals(filteredRentals.map(rental =>
          rental.id === id ? { ...rental, likesCount: rental.likesCount + 1, likerIds: [...rental.likerIds, user._id] } : rental));
      }
    } else {
      alert('Error adding like.');
    }
  };

  const handleAddBookmark = async (id: number) => {
    const result = await rentalsApi.addBookmark(id, user._id)
    const data = result.data as any

    if (result.ok) {
      if (data.alreadyBookmarked) {
        setFilteredRentals(filteredRentals.map(rental =>
          rental.id === id ? { ...rental, bookmarkIds: rental.bookmarkIds.filter((bookmarkId: any) => bookmarkId !== user._id) } : rental))
        if (route.name === 'Gear') {
          setFilteredRentals(filteredRentals.filter(rental => rental.id !== id))
        }
      } else {
        setFilteredRentals(filteredRentals.map(rental =>
          rental.id === id ? { ...rental, bookmarkIds: [...rental.bookmarkIds, user._id] } : rental))
      }
    } else {
      alert('Error bookmarking rental.')
    }

  }

  return {
    handleAddLike,
    handleAddBookmark,
    handleRefresh,
    refreshing,
    filteredRentals,
  };
}
