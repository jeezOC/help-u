import React from 'react';
import Button from '../Button/Button';
import Input from '../FormToolkit/components/Inputs/Input';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';

const LoginForm = () => {
  return (

      <Formik
        initialValues={{ email: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ handleSubmit, values }) => (
          <View style={styles.formContainer} >
            <Input name='email' label='Email' />
            <Input name='password' label='Password' type='password' />
            <Button onPress={() => handleSubmit} label='Login' size={'lg'}
            style={{
              width: '90%',
              marginTop: 20,
            }}  />
            <Text>
              or create an account
            </Text>
          </View>
        )}
      </Formik>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginForm;
