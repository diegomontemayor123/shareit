import React from "react";
import { useFormikContext, FormikValues } from "formik";
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppFormFieldProps {
  name: string;
  width?: number;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  [key: string]: any; 
}

const AppFormField: React.FC<AppFormFieldProps> = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, values, errors, touched } = useFormikContext<FormikValues>();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text: string) => setFieldValue(name, text)}
        value={values[name] as string}
        width={width}
        {...otherProps}
      />
      <ErrorMessage 
        error={errors[name] as string} 
        visible={Boolean(touched[name])} 
      />
    </>
  );
}

export default AppFormField;
