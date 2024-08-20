import React from "react";
import { StyleSheet } from "react-native";
import Text from "../AppText";

interface ErrorMessageProps {
  error?: string;
  visible?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, visible }) => {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: { color: "red" },
});

export default ErrorMessage;
