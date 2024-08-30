import React from "react";
import { View, StyleSheet } from "react-native";
import Text from '../AppText';
import colors from "../../config/colors";

interface RecipeDescriptionProps {
  description: string;
  isIngredient?: boolean
}

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ description, isIngredient }) => {
  const descriptionSteps = description.split('. ').filter(step => step.trim() !== '');

  return (
    <View style={styles.description}>
      {descriptionSteps.map((step, index) => (
        <Text key={index} style={styles.step}>
          {isIngredient ? `${index + 1}. ${step.replace(/\.$/, '')}` : `Step ${index + 1}. ${step.endsWith('.') ? step : `${step}.`}`}
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
    padding: 2,
  },
  step: {
    fontSize: 16,
    marginVertical: 4,
    marginLeft: 15,
  },
});

export default RecipeDescription;
