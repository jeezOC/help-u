import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Login from '../screens/Login';
import AppLayout from './AppLayout';
import { AppColors } from '../styles/AppTheme';


type TNoHeaderLayoutProps = {
  Login: undefined;
  App: undefined;
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
            title: 'HelpU | Login',
          }}
        />
        <Stack.Screen name="App" component={AppLayout}
        options={{
          headerStyle: {
            backgroundColor: AppColors.orangeSolid,
          },
          headerTintColor: AppColors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Help U',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NoHeaderLayout;