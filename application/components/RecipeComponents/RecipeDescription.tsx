import React from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import colors from "../../config/colors";

interface RecipeDescriptionProps {
  description: string;
}

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ description }) => {
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
};

const styles = StyleSheet.create({
  description: {
    marginBottom: 10,
    marginTop: 0,
    backgroundColor: colors.light,
    borderRadius: 10,
    borderColor: colors.dark,
    padding: 5,
  },
  step: {
    fontSize: 16,
    marginVertical: 4,
    marginLeft: 15,
  },
});

export default RecipeDescription;
