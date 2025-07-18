import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";

interface SubmitButtonProps {
  title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} />;
};

export default SubmitButton;
