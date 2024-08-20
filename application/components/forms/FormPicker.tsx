import React from "react";
import { useFormikContext } from "formik";
import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

interface PickerItemType {
  label: string;
  value: string | number;
  backgroundColor?: string;
  icon?: string;
}

interface AppFormPickerProps {
  items: PickerItemType[];
  name: string;
  numberOfColumns?: number;
  PickerItemComponent?: React.ComponentType<{ item: PickerItemType; onPress: () => void }>;
  placeholder: string;
  width?: string;
}

const AppFormPicker: React.FC<AppFormPickerProps> = ({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<{ [key: string]: PickerItemType }>();

  return (
    <>
      <Picker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item: PickerItemType) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage
        error={errors[name] as string}
        visible={Boolean(touched[name])}
      />
    </>
  );
};

export default AppFormPicker;
