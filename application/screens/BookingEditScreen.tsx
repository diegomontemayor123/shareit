import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { Form, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import useSubmitRental from "../hooks/useSubmitRental";
import FormDatePicker from "../components/forms/FormDatePicker";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

function BookingEditScreen({ navigation, route }: any) {
    const { handleSubmit, uploadVisible, progress } = useSubmitRental({ navigation });
    const [rental, setRental] = useState(route.params || null)

    useFocusEffect(
        React.useCallback(
            () => {
                setRental(route.params)
            }, [route.params]))

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Screen style={styles.container}>
                    <UploadScreen
                        progress={progress}
                        visible={uploadVisible}
                    />
                    <Form
                        initialValues={{
                            bookings: "",
                            images: rental?.images?.map((image: any) => image.url) || []
                        } as any}
                        onSubmit={(values: any, { resetForm }: any) => handleSubmit(values, { resetForm }, rental._id)}
                    >
                        <AppText style={defaultStyles.text}>Blocked Dates</AppText>
                        <FormDatePicker name="bookings" placeholder={rental ? JSON.parse(rental.bookings) : null} />
                        <SubmitButton title={"Book Gear"} />
                    </Form>
                </Screen>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default BookingEditScreen;
