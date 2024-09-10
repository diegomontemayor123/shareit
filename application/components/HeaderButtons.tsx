import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const HeaderLeftButton: React.FC<any> = ({ navigation }: any) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Feed", { screen: "Recipes" })}>
            <MaterialCommunityIcons name="home" size={30} color={colors.primary} />

        </TouchableOpacity>
    );
}

const HeaderRightButton: React.FC<any> = ({ navigation }: any) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Profile", { screen: "Messages" })}>
            <MaterialCommunityIcons name="send" size={30} color={colors.primary} />

        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    button: {

        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },

});

export {
    HeaderLeftButton,
    HeaderRightButton
}