import React from 'react';
import Button from '../Button/Button';
import Input from '../FormToolkit/components/Inputs/Input';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';

const signUpForm = ({ navigation }) => {
  const handleSubmit = (values) => {
    navigation.replace('signUp');
  }

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        lastName: '',
        phone: '',
        username: '',
        password: ''
      }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer} >
          <Input name='username' label='Usuario' />
          <Input name='name' label='Nombre' />
          <Input name='lastName' label='Apellidos' />
          <Input name='phone' label='Teléfono' />
          <Input name='email' label='Email' />
          <Input name='password' label='Password' type='password' />
          <Button onPress={() => handleSubmit()} label='Registrarse' size={'lg'}
            style={{
              width: '90%',
              marginTop: 20,
            }} />
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

export default signUpForm;