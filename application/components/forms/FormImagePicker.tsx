import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

interface FormImagePickerProps {
  name: string;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<Record<string, string[]>>();
  const imageUris = values[name] || [];

  const handleAdd = (uri: string | null) => {
    if (uri) {
      setFieldValue(name, [...imageUris, uri]);
    }
  };

  const handleRemove = (uri: string | null) => {
    if (uri) {
      setFieldValue(
        name,
        imageUris.filter((imageUri) => imageUri !== uri)
      );
    }
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name] as string} visible={Boolean(touched[name])} />
    </>
  );
};

export default FormImagePicker;
