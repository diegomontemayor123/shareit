import React from "react";
import { Alert, Keyboard, StyleSheet } from "react-native";
import colors from "../../config/colors";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from ".";
import messagesApi from "../../api/messages";

function ContactForm({ recipe }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();
    
    const result = await messagesApi.send(message, recipe.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
        style={styles.messageInput}
      />
      <SubmitButton title="Send Message" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

const styles = StyleSheet.create({
  messageInput: {
    fontSize: 16,
    marginTop: 0,
    padding: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,

  },
 
});

export default ContactForm;