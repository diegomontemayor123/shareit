import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

interface FormImagePickerProps {
  name: string;
  multipleImages?: boolean
  placeholderUrl?: string;
  placeholderThumbnailUrl?: string
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({ name, multipleImages = true, placeholderUrl, placeholderThumbnailUrl }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<Record<string, string[]>>();
  const imageUris = values[name] || [];

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
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        placeholderUrl={placeholderUrl}
        placeholderThumbnailUrl={placeholderThumbnailUrl}

      />
      <ErrorMessage error={errors[name] as string} visible={Boolean(touched[name])} />
    </>
  );
};

export default FormImagePicker;
