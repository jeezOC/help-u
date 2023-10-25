import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import { PaperProvider } from 'react-native-paper';
import AuthProvider from './app/context/AuthContext';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{
              headerShown: false
            }}
            />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

