import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AppLayout from './AppLayout';
import { AppColors, AppFonts } from '../styles/AppTheme';

export type TNoHeaderLayoutProps = {
  Login: undefined;
  App: undefined;
  SignUp: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<TNoHeaderLayoutProps>();
const NoHeaderLayout = () => {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login}
          options={{
            headerShown: false,
            title: 'HelpU | Inicio de Sesión',
          }}
        />
        <Stack.Screen name="App" component={AppLayout}
          options={{
            headerStyle: {
              backgroundColor: AppColors.orangeSolid,
            },
            headerTintColor: AppColors.white,
            headerTitleStyle: {
              fontFamily: AppFonts.bold,
            },
            title: 'Help U',
          }} />

        <Stack.Screen name='SignUp' component={SignUp}
          options={{
            headerStyle: {
              backgroundColor: AppColors.orangeSolid,
            },
            headerTintColor: AppColors.white,
            headerTitleStyle: {
              fontFamily: AppFonts.bold,
            },
            title: 'Registrarse',
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NoHeaderLayout;
