import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Slide from "../components/Slide";
import colors from "../config/colors";
import rentalsApi from "../api/rentals";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import SorterFilter from "../components/SorterFilter";
import { getUserbyId } from "../api/users";
import { useFocusEffect, useRoute } from '@react-navigation/native';

function RentalsScreen({ filterFn, errorMessage, emptyMessage, navigation, onCategoryChange, profilePage = false }: any) {
  const getRentalsApi = useApi(rentalsApi.getRentals);
  const { user } = useAuth();
  const [selectedSort, setSelectedSort] = useState<any>()
  const [users, setUsers] = useState<{ [_id: string]: string }>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filteredRentals, setFilteredRentals] = useState<any[]>([]);
  const route = useRoute()

  useEffect(() => {
    if (getRentalsApi.data) {
      const filtered = filterFn(getRentalsApi.data as any);
      setFilteredRentals(filtered);
    }
  }, [getRentalsApi.data, filterFn]);

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh()
      fetchUsers()
    }, [])
  );

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
    } else { alert('Error adding like.') }
  };

  const handleAddBookmark = async (id: number) => {
    const result = await rentalsApi.addBookmark(id, user._id)
    const data = result.data as any
    if (result.ok) {
      if (data.alreadyBookmarked) {
        setFilteredRentals(filteredRentals.map(rental =>
          rental.id === id ? { ...rental, bookmarkIds: rental.bookmarkIds.filter((bookmarkId: any) => bookmarkId !== user._id) } : rental))
        if (route.name === 'Wishlist') {
          setFilteredRentals(filteredRentals.filter(rental => rental.id !== id))
        }
      } else {
        setFilteredRentals(filteredRentals.map(rental =>
          rental.id === id ? { ...rental, bookmarkIds: [...rental.bookmarkIds, user._id] } : rental))
      }
    } else { alert('Error bookmarking rental.') }
  }

  const fetchUsers = async () => {
    const _ids = filteredRentals.map((rental) => rental.userId);
    const userFetches = _ids.map(_id => getUserbyId(_id));
    const usersData = await Promise.all(userFetches);
    const usersMap: { [_id: string]: string } = {};
    usersData.forEach((userData, index) => {
      usersMap[_ids[index]] = userData.name;
    }); setUsers(usersMap);
  };

  const getSortedRentals = () => {
    let sortedRentals = [...filteredRentals];
    if (selectedSort) {
      if (selectedSort.label === "Likes") {
        sortedRentals.sort((a, b) => b.likesCount - a.likesCount);
      } else { sortedRentals.sort((a, b) => b.id.localeCompare(a.id)) }
    } else { sortedRentals.sort((a, b) => b.id.localeCompare(a.id)) }
    return sortedRentals
  }

  return (
    <><ActivityIndicator visible={getRentalsApi.loading} />
      <Screen style={styles.screen}>
        {(getRentalsApi.error || filteredRentals.length === 0) && (
          <><AppText style={{ marginVertical: 15 }}>{getRentalsApi.error ? errorMessage : emptyMessage}</AppText>
            <Button title="Retry" onPress={handleRefresh} />
          </>)}
        <SorterFilter
          onCategoryFilterChange={
            (categoryFilter: any) => { onCategoryChange(categoryFilter) }}
          onSortChange={
            (sort: any) => { setSelectedSort(sort) }} />
        <FlatList
          numColumns={profilePage ? 2 : 1}
          data={getSortedRentals()}
          keyExtractor={(rental) => rental.id.toString()}
          renderItem={({ item }) => {
            const showBookmark = item.bookmarkIds?.includes(user._id)
            const userName = users[item.userId]
            return (<View style={profilePage ? styles.slideContainer : null}>
              {<Slide
                profilePage={profilePage}
                title={item.title}
                subTitle={`$${item.dailyPrice} / day`}
                subTitle2={userName}
                category={item.categoryIcon}
                color={item.categoryColor}
                imageUrl={item.images[0].url}
                thumbnailUrl={item.images[0].thumbnailUrl}
                onPress={() => navigation.navigate("RentalDetails", item)}
                showBookmark={showBookmark}
                addLike={() => handleAddLike(item.id)}
                addBookmark={() => handleAddBookmark(item.id)}
                likesCount={item.likesCount}
              />}</View>)
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        /></Screen></>)
}
const styles = StyleSheet.create({
  screen: {
    padding: 8,
    backgroundColor: colors.light,
  },
  slideContainer: {
    flex: 1,
    margin: 8,
  },
});
export default RentalsScreen;
