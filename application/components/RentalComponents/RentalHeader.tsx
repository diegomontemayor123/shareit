import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import Icon from "../Icon";
import { Entry } from "../entries";
import Avatar from "../Avatar";
import colors from "../../config/colors";
import { getUserbyId } from "../../api/users"


interface RentalHeaderProps {
  rentalCount: number;
  navigation: any;
  rental?: any
}

const RentalHeader: React.FC<RentalHeaderProps> = ({
  rentalCount,
  navigation,
  rental

}) => {
  const [rentalUser, setRentalUser] = useState({ _id: "", name: "", images: { url: null, thumbnailUrl: null } })
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getUserbyId(rental?.userId)
      setRentalUser(result)
    }
    fetchImages()
  }, [rental?.userId])
  const createdAt = () => new Date(parseInt(rental?._id.toString().substring(0, 8), 16) * 1000).toString().substring(4, 15)

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{rental?.title}</Text>
        <Icon backgroundColor={rental?.categoryColor} name={rental?.categoryIcon} size={35} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.dailyPrice}>${rental?.dailyPrice} / day</Text>
        <Text style={{ fontSize: 12 }}>{createdAt()}</Text>
      </View>
      <View>
        <Entry
          IconComponent={
            <Avatar
              firstName={rentalUser.name?.split(" ")[0]}
              lastName={rentalUser.name?.split(" ")[1] || ""}
              size={55}
              imageUrl={rentalUser.images?.url || null}
              thumbnailUrl={rentalUser.images?.thumbnailUrl || null}
            />
          }
          title={rentalUser.name}
          onPress={() => navigation.navigate("Users Rentals", { userId: rentalUser._id })}
          subTitle={rentalCount === 1 ? `${rentalCount} Rental` : `${rentalCount} Rentals`}
          containerPadding={0}
          containerMarginVert={10}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  dailyPrice: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RentalHeader;
