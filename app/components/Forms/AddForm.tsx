import React from 'react';
import Button from '../Button/Button';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import Input from '../FormToolkit/components/Inputs/Input';

const Add = ({ navigation }) => {
  const handleSubmit = (values) => {
    navigation.replace('add');
  }

  return (
    <Formik
      initialValues={{
        name: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        photos: '',
        org: '',
      }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer} >
          <Input name='name' label='Nombre' />
          <Input name='desc' label='Descripción' />
          
          <Input name='org' label='Organización asociada' />
          <Button onPress={() => handleSubmit()} label='Crear' size={'lg'}
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

export default Add;