import React from 'react';
import Button from '../Button/Button';
import Input from '../FormToolkit/components/Inputs/Input';
import { Formik } from 'formik';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppColors, AppFonts } from '../../styles/AppTheme';
import { useAuth } from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

const LoginForm = ({ navigation }) => {

  const { handleLogin, isLoading } = useAuth();
const toast = useToast();

  const handleSubmitLogin = async (values) => {
    const { email, password } = values;

    if (email === ''){
      toast({
        type: 'error',
        message: 'Debes ingresar un email'
      })
      return;
    }
    if (password === ''){
      toast({
        type: 'error',
        message: 'Debes ingresar una contraseña'
      })
      return;
    }
    const { success } = await handleLogin(email, password);
    if (success) {
      navigation.replace('App');
    }
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={values => handleSubmitLogin(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer} >
          <Input name='email' label='Email' />
          <Input name='password' label='Contraseña' type='password' />
          <Button onPress={() => handleSubmit()} label='Iniciar Sesión' size={'lg'}
            style={{
              width: '90%',
              marginTop: 20,
              marginBottom: 10,
            }} />
          <Text style={{ fontFamily: AppFonts.ligth }}>
            ¿No tienes cuenta? &nbsp;
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ fontFamily: AppFonts.bold, color: AppColors.greenSolid }}>
                Registrate
              </Text>
            </TouchableOpacity>
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
