import React from 'react';
import Button from '../Button/Button';
import Input from '../FormToolkit/components/Inputs/Input';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';

const settings = ({ navigation }) => {
  const handleSubmit = (values) => {
    navigation.replace('settings');
  }

  return (
    <Formik
      initialValues={{ }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer} >
          <Button onPress={() => handleSubmit()} label='Desconectarse' size={'lg'}
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

export default settings;
