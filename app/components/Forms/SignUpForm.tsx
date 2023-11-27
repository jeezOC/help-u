import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../FormToolkit/components/Inputs/Input';
import { Formik } from 'formik';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TUser } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { AppColors, AppFonts } from '../../styles/AppTheme';

const signUpForm = ({ navigation }) => {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { handleRegister } = useAuth();
  const toast = useToast();

  const initialUserValues: { password1: string, password2: string } & Partial<Omit<TUser, 'id'>> = {
    email: '',
    userName: '',
    password1: '',
    password2: '',
  }

  const handleSaveUser = async (values) => {
    setIsSubmitting(true);
    if (!values.email || !values.password1 || !values.password2 || !values.userName) {
      toast({
        type: 'warning',
        message: 'Por favor complete todos los campos'
      })
      setIsSubmitting(false);
      return false;
    }
    if (values.password1 !== values.password2) {
      toast({
        type: 'warning',
        message: 'Las contraseñas no coinciden'
      })
      setIsSubmitting(false);
      return false;
    }
    const password = values.password1;
    const { success } = await handleRegister(values.email, password, values.userName);
    setIsSubmitting(false);
    if (success) {
      toast({
        type: 'success',
        message: 'Usuario creado con éxito'
      })
      navigation.navigate('Login');
    }
  }

  return (
    <Formik
      initialValues={initialUserValues}
      onSubmit={values => handleSaveUser(values)}
    >
      {({ handleSubmit, values }) => (

        <View style={styles.formContainer} >
          <Input
            name='userName'
            label='Nombre de usuario'
          />
          <Input
            name='email'
            label='Correo electrónico'
          />
          <Input
            name='password1'
            label='Contraseña'
            type='password'
          />
          <Input
            name='password2'
            label='Confirmar contraseña'
            type='password' />
          <Button
            onPress={() => handleSubmit()}
            label='Crear cuenta'
            size={'lg'}
            isLoading={isSubmitting}
            style={{
              width: '90%',
              marginTop: 20,
              marginBottom: 10,
            }} />
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: AppFonts.ligth, }}>
              ¿Ya tienes cuenta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontFamily: AppFonts.bold, color: AppColors.greenSolid, padding: 5 }}>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default signUpForm;