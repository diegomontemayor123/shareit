/*import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import * as Yup from "yup";
import { Form, FormField, FormPicker as Picker, SubmitButton } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";
import useSubmitRental from "../hooks/useSubmitRental";
import { categories, getCategoryLabelByValue } from "../config/categories";
import rentalsApi from "../api/rentals";




const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    timeToComplete: Yup.number().required().min(1, "Please input at least one minute.").max(10000).label("Time to Complete"),
    availdates: Yup.string().required().label("availdates"),
    description: Yup.string().required().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image."),
});

const editValidation = Yup.object().shape({
    images: Yup.array().min(1, "Please select at least one image."),
});

interface RentalEditScreenProps {
    navigation: any;
    route: any
}
interface RentalFormValues {
    name?: string
    title: string;
    timeToComplete: string;
    availdates: string;
    description: string;
    category: any;
}
function RentalEditScreen({ navigation, route }: RentalEditScreenProps) {
    const { handleSubmit, uploadVisible, progress } = useSubmitRental({ navigation });
    const rental = route.params


    const handleEdit = async (newRentalInfo: any, { resetForm }: any) => {
        await rentalsApi.editRental(rental._id, newRentalInfo)
        resetForm()
        navigation.goBack()
    }

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
                            title: "",
                            timeToComplete: "",
                            availdates: "",
                            description: "",
                            category: "",
                        } as RentalFormValues}
                        onSubmit={rental ? handleEdit : handleSubmit}
                        validationSchema={rental ? editValidation : validationSchema}
                    >
                        <FormImagePicker name="images"
                            placeholderUrls={rental?.images.map((image: any) => image.url || [])} />
                        <FormField
                            maxLength={255}
                            name="title"
                            placeholder={rental?.title || "Title"}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <FormField
                            keyboardType="numeric"
                            maxLength={8}
                            name="timeToComplete"
                            placeholder={rental ? rental.timeToComplete.toString() + " min." : "Min. to complete"}
                            width={250}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <Picker
                            items={categories}
                            name="category"
                            numberOfColumns={3}
                            PickerItemComponent={CategoryPickerItem}
                            placeholder={getCategoryLabelByValue(rental?.categoryId) || "Cuisine"}
                            width="50%"
                        />
                        <FormField
                            maxLength={1000}
                            multiline
                            name="availdates"
                            numberOfLines={10}
                            placeholder={rental?.availdates || "availdates - Please separate each availdate with a period '.'"}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <FormField
                            maxLength={1000}
                            multiline
                            name="description"
                            numberOfLines={10}
                            placeholder={rental?.description || "Rental - Please separate each step with a period '.'"}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <SubmitButton title={rental ? "Done" : "Cook up"} />
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

export default RentalEditScreen;


import { useState } from "react";
import rentalsApi from "../api/rentals";
import useAuth from "../auth/useAuth";
import useLocation from "./useLocation";
import routes from "../navigation/routes";
import { Alert } from "react-native";

interface Rental {
    _id: string;
    title: string;
    timeToComplete: number;
    categoryId: number;
    categoryIcon: string;
    categoryColor: string;
    description: string;
    userId: string
    likesCount: number;
    likerIds: string[];
    images: { fileName: string }[];
    location: {
        latitude: number;
        longitude: number;
    };
}

interface ApiResponse<T> {
    ok: boolean;
    data: T;
}

interface ApiErrorResponse {
    ok: false;
    error: string;
}

interface Props {
    navigation: any;
}
export default function useSubmitRental({ navigation }: Props) {
    const [uploadVisible, setUploadVisible] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const { user } = useAuth();
    const location = useLocation();

    const handleSubmit = async (rental: any, { resetForm }: { resetForm: () => void }) => {
        setProgress(0);
        setUploadVisible(true);
        try {
            const result: ApiResponse<Rental> | ApiErrorResponse = await rentalsApi.addRental(
                { ...rental, location },
                (progress: number) => {
                    setProgress(progress);
                },
                user
            ) as ApiResponse<Rental>;
            if (!result.ok) {
                setUploadVisible(false);
                resetForm();
                console.log('Error: ' + JSON.stringify(result))
                return Alert.alert("Could not save the rental");
            }
            const response: ApiResponse<Rental[]> = await rentalsApi.getRentals() as ApiResponse<Rental[]>;
            const rentals = response.data;
            const updatedRental = rentals.find((r) => r._id === result.data._id);

            if (!updatedRental) {
                setUploadVisible(false);
                resetForm();
                return Alert.alert("Could not fetch the updated rental from the server");
            }
            resetForm();
            setUploadVisible(false);
            navigation.navigate(routes.RECIPE_DETAILS, updatedRental);
        } catch (error) {
            setUploadVisible(false);
            resetForm();
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
    */