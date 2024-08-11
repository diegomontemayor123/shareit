import React from "react";
import { View, StyleSheet } from "react-native";
import Text from '.././Text'
import colors from "../../config/colors";

function ListingDescription({ description }) {
  const descriptionSteps = description.split('. ').filter(step => step.trim() !== '');

  return (
    <View style={styles.description}>
      {descriptionSteps.map((step, index) => (
        <Text key={index} style={styles.step}>
          Step {index + 1}. {step.endsWith('.') ? step : `${step}.`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: colors.light,
    borderRadius: 25,
    borderColor: colors.dark,
    borderWidth: 1,
    padding: 5,
  },
  step: {
    fontSize: 16,
    marginVertical: 4,
    marginLeft: 15,
  },
});

export default ListingDescription;
