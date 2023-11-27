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

    if (email === '') {
      toast({
        type: 'error',
        message: 'Debes ingresar un email'
      })
      return;
    }
    if (password === '') {
      toast({
        type: 'error',
        message: 'Debes ingresar una contraseña'
      })
      return;
    }
    const { success, user } = await handleLogin(email, password);
    if (success) {
      if (user.onBoardingCompleted) {
        navigation.replace('App');
      }else{
        navigation.replace('Onboarding');
      }
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
          <View style={{ flexDirection:'row', gap:5,alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: AppFonts.ligth, }}>
              ¿No tienes cuenta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ fontFamily: AppFonts.bold, color: AppColors.greenSolid, padding:5 }}>
                Registrate
              </Text>
            </TouchableOpacity>
          </View>

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
