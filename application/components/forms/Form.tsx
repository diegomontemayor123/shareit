import React from "react";
import { Formik, FormikValues, FormikHelpers } from "formik";


interface RegisterFormValues {
  name?: string;
  message?: string
  email?: string;
  password?: string;
}

interface AppFormProps {
  initialValues: RegisterFormValues;
  onSubmit: any
  validationSchema: any;
  children: React.ReactNode;
}

const AppForm: React.FC<AppFormProps> = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
