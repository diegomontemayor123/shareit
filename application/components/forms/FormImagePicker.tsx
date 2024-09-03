import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ImageList from "../ImageList";

interface FormImagePickerProps {
  name: string;
  multipleImages?: boolean
  placeholderUrls?: string[];
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({ name, multipleImages = true, placeholderUrls }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<Record<string, string[]>>();
  const imageUris = values[name] || (placeholderUrls ? placeholderUrls : [])

  const handleAdd = (uri: string | null) => {
    if (uri) {
      multipleImages ? setFieldValue(name, [...imageUris, uri]) : setFieldValue(name, [uri]);
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
      <ImageList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name] as string} visible={Boolean(touched[name])} />
    </>
  );
};

export default FormImagePicker;
