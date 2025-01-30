import React, { useState, useRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions, FlatList, Modal, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RentalImages from "../components/RentalComponents/RentalImages"
import RentalHeader from "../components/RentalComponents/RentalHeader"
import ItemDescription from "../components/RentalComponents/ItemDescription"
import Text from '../components/AppText';
import { FormField, Form, SubmitButton } from "../components/forms";
import { Entry, EntrySeparator, EntryDeleteAction } from "../components/entries";
import Avatar from "../components/Avatar";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import useRentalCount from "../hooks/useRentalCount";
import { getUserbyId } from "../api/users";
import rentalsApi from "../api/rentals";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../config/colors";
import messagesApi from "../api/messages";
import AppButton from "../components/Button";
import FormDatePicker from "../components/forms/FormDatePicker";

const { width } = Dimensions.get('window');
function RentalDetailsScreen({ route, navigation }: any) {
  const rentalId = route.params._id
  const { user } = useAuth()
  const [updatedUser, setUpdatedUser] = useState<any>({})
  const [rentalUser, setRentalUser] = useState<{ [_id: string]: string }>({});
  const [rental, setRental] = useState<any>(route.params);
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const rentalCount = useRentalCount(rental?.userId || null);
  const scrollRef = useRef<any>(null)

  const fetchCommentUsersandRental = async () => {
    const userData = await getUserbyId(rental?.userId);
    const updatedUserData = await getUserbyId(user._id)
    const response: any = await rentalsApi.getRentals() as any;
    const updatedRental = response.data.find((r: any) => r._id === rentalId);
    setRental(updatedRental);
    setRentalUser(userData);
    setUpdatedUser(updatedUserData)

    const userIds = new Set<string>();
    rental?.comments.forEach((comment: any) => {
      userIds.add(comment.user);
    });

    const details: { [key: string]: any } = {};
    for (const _id of userIds) {
      const userData = await getUserbyId(_id);
      details[_id] = userData;
    }
    setUserDetails(details);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCommentUsersandRental();
    }, [rentalId, rental?.userId, userDetails])
  );

  const handleChange = (item: any, navigation: any) => {
    Alert.alert("Edit Rental", "How would you like to change this rental?", [
      {
        text: "Edit Rental",
        onPress: async () => {
          try {
            navigation.navigate("Edit", item)
          } catch (error) {
            alert("An unexpected error occurred.");
          }
        },
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const result = await rentalsApi.deleteRental(item.id);
            if (!result.ok) {
              return alert("Could not delete the rental.");
            }
            navigation.navigate('My Gear')
          } catch (error) {
            alert("An unexpected error occurred.");
          }
        },
      },
      { text: "Cancel" }
    ]);
  };

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    const result = await rentalsApi.addComment(rentalId, user._id, values.comment)
    if (result.ok) {
      await fetchCommentUsersandRental()
      resetForm()
    }
    else {
      Alert.alert("Could not post comment.")
      resetForm()
    }
  };

  const handleDelete = async (_id: any, commentId: string) => {
    try {
      const result = await rentalsApi.deleteComment(_id, commentId);
      fetchCommentUsersandRental()
      if (!result.ok) {
        return alert("Could not delete message.");
      }
    } catch (error) { alert("An unexpected error occurred."); }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <ScrollView>
        {user._id == rentalUser._id && (
          <View style={styles.Button}>
            <TouchableWithoutFeedback onPress={() => handleChange(rental, navigation)} >
              <MaterialCommunityIcons name="cog" size={30} color={colors.light} />
            </TouchableWithoutFeedback>
          </View>
        )}
        <View style={styles.bottomButton}>
          <TouchableWithoutFeedback onPress={
            () => { navigation.navigate('Contacts Screen') }
          }>
            <MaterialCommunityIcons name="share" size={30} color={colors.light} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{ marginLeft: 5 }} onPress={
            () => {
              fetchCommentUsersandRental()
              setShowModal(true)
            }} >
            <MaterialCommunityIcons name="comment" size={30} color={colors.light} />
          </TouchableWithoutFeedback>
        </View>
        <RentalImages images={rental?.images} width={width} />
        <View style={styles.detailsContainer}>
          <RentalHeader
            rentalCount={rentalCount}
            navigation={navigation}
            rental={rental}
          />
          <Text style={styles.header}>Description</Text>
          <ItemDescription description={rental?.description} />
          <Text style={styles.header}>Availability</Text>


          <AppButton title="Book Gear" onPress={() => console.log('press')} />
        </View></ScrollView>

      <Modal visible={showModal} animationType="slide"><Screen>
        <View style={{ padding: 15 }}>
          <TouchableWithoutFeedback onPress={() => {
            setShowModal(false)
          }}>
            <MaterialCommunityIcons name="close" size={30} />
          </TouchableWithoutFeedback></View>

        <FlatList data={rental?.comments}
          keyExtractor={(comment) => `${comment._id}`}
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current.scrollToEnd()}
          onLayout={() => scrollRef.current.scrollToEnd()}
          renderItem={({ item }) => {
            const displayUser = userDetails[item.user];
            if (!displayUser) return null
            return (
              <Entry
                title={displayUser.name}
                icon3={"email"}
                icon3Function={
                  async () => {
                    const result = await messagesApi.sendMessage(`${rental?.title} by ${rentalUser.name}`, user._id, displayUser._id, rental, null) as any;
                    if (!result.ok) { return Alert.alert("Error", "Could not send the message.") }
                    navigation.navigate(
                      "Chat", { ...result.data } as any,
                    )
                    setShowModal(false)
                  }
                }
                subTitle={item.message}
                onPress={() => {
                  navigation.navigate(
                    'Users Rentals',
                    { userId: item.user },); setShowModal(false)

                }}
                renderRightActions={(item.user != user._id && user._id != rental?.userId) ? () => null : () => (
                  <EntryDeleteAction onPress={() => handleDelete(rental?._id, item._id)} />
                )}
                IconComponent={
                  <Avatar
                    firstName={displayUser.name.split(" ")[0]}
                    lastName={displayUser.name.split(" ")[1] || ""}
                    size={55}
                    imageUrl={displayUser.images?.url || null}
                    thumbnailUrl={displayUser.images?.thumbnailUrl || null}
                  />} />);
          }}
          ItemSeparatorComponent={EntrySeparator} />
        <View style={{ padding: 10 }}>
          <Text style={styles.header}>Add Comment</Text>
          <Form initialValues={{ comment: '' }} onSubmit={handleSubmit}>
            <FormField autoCorrect={true} icon="comment" name="comment"
              placeholder="Type a comment here." blurOnSubmit={true} />
            <SubmitButton title="Post Comment" />
          </Form></View>
      </Screen></Modal>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  detailsContainer: {
    padding: 15,
  },
  header: {
    fontWeight: "800",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10
  },
  Button: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  bottomButton: {
    position: 'absolute',
    top: 255,
    right: 10,
    zIndex: 1,
    flexDirection: "row",

  },
});

export default RentalDetailsScreen;
