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
import useRentalActions from "../hooks/useRentalActions";
import SorterFilter from "../components/SorterFilter";
import { getUserbyId } from "../api/users";
import { useFocusEffect } from '@react-navigation/native';
import { useRef } from "react";

interface Rental {
  id: number;
  title: string;
  timeToComplete: string;
  categoryIcon: string;
  categoryColor: string;
  images: { url: string; thumbnailUrl: string }[];
  likesCount: number;
}

interface RentalsProps {
  filterFn: (rentals: Rental[]) => Rental[];
  errorMessage: string;
  emptyMessage: string;
  navigation: any;
  onCategoryChange: any
  onUsersChange?: (users: any) => void;
  profilePage?: boolean
  searchPage?: boolean
}

function RentalsScreen({ filterFn, errorMessage, emptyMessage, navigation, onCategoryChange, onUsersChange = () => { }, profilePage = false, searchPage = false }: RentalsProps) {
  const { handleAddLike, handleAddBookmark, handleRefresh, refreshing, filteredRentals } = useRentalActions(filterFn);
  const getRentalsApi = useApi(rentalsApi.getRentals);
  const { user } = useAuth();
  const [selectedSort, setSelectedSort] = useState<any>()
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<any>()
  const [users, setUsers] = useState<{ [_id: string]: string }>({});

  const fetchUsers = async () => {
    const _ids = filteredRentals.map((rental) => rental.userId);
    const userFetches = _ids.map(_id => getUserbyId(_id));
    const usersData = await Promise.all(userFetches);
    const usersMap: { [_id: string]: string } = {};
    usersData.forEach((userData, index) => {
      usersMap[_ids[index]] = userData.name;
    });
    setUsers(usersMap);
    if (onUsersChange) onUsersChange(usersMap)
  };

  const prevFilteredRentals = useRef(filteredRentals);

  useEffect(() => {
    if (filteredRentals.length > 0) {

      if (JSON.stringify(filteredRentals) !== JSON.stringify(prevFilteredRentals.current)) {
        fetchUsers();
        prevFilteredRentals.current = filteredRentals;
      }
    }
  }, [filteredRentals]);

  useFocusEffect(
    React.useCallback(() => {
      getRentalsApi.request();
      handleRefresh()
    }, [])
  );

  const getSortedRentals = () => {
    let sortedRentals = [...filteredRentals];
    if (selectedSort) {
      if (selectedSort.label === "Likes") {
        sortedRentals.sort((a, b) => b.likesCount - a.likesCount);
      } else {
        sortedRentals.sort((a, b) => {
          return b.id.localeCompare(a.id)
        });
      }
    }
    else {
      sortedRentals.sort((a, b) => {
        return b.id.localeCompare(a.id)
      })
    }
    return sortedRentals;
  };

  return (
    <>
      <ActivityIndicator visible={getRentalsApi.loading} />
      <Screen style={styles.screen}>
        {(getRentalsApi.error || filteredRentals ? filteredRentals.length === 0 : null) && (
          <>
            <AppText style={{ marginVertical: 15 }}>{getRentalsApi.error ? errorMessage : emptyMessage}</AppText>
            <Button title="Retry" onPress={handleRefresh} />
          </>
        )}

        <SorterFilter
          onCategoryFilterChange={
            (categoryFilter: any) => {
              setSelectedCategoryFilter(selectedCategoryFilter)
              onCategoryChange(categoryFilter)
            }}
          onSortChange={
            (sort: any) => {
              setSelectedSort(sort)
            }} />

        <FlatList
          numColumns={profilePage ? 2 : 1}
          data={getSortedRentals()}
          keyExtractor={(rental) => rental.id.toString()}
          renderItem={({ item }) => {
            const showBookmark = item.bookmarkIds?.includes(user._id)

            const userName = users[item.userId]
            return (
              <View style={profilePage ? styles.slideContainer : null}>
                {searchPage ? null :
                  <Slide
                    profilePage={profilePage}
                    title={item.title}
                    subTitle={`~${item.timeToComplete} min`}
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
                  />
                }
              </View>
            );
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </Screen>
    </>
  );
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
