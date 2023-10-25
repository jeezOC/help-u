import { Formik, FormikProps } from "formik";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface ISingleForm {
  initialValues: any;
  validationSchema?: any;
  onSubmit?: (values: any) => void;
  children: (formikProps: FormikProps<any>) => JSX.Element | ReactNode;
}

const SingleForm = ({ initialValues, validationSchema = undefined, onSubmit = () => { }, children }: ISingleForm) => {
  return (
    <Formik
      initialValues={initialValues}
      {...validationSchema && { validationSchema: validationSchema }}
      onSubmit={onSubmit}
    >
      {(formikProps: FormikProps<any>) => (
        <View style={{ width: '100%' }}>
          {children(formikProps)}
        </View>
      )}
    </Formik>
  );
}

export default SingleForm;