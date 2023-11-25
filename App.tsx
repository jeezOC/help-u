import { PaperProvider } from 'react-native-paper';
import AuthProvider from './app/context/AuthContext';
import NoHeaderLayout from './app/layouts/NoHeaderLayout';
import { Lexend_200ExtraLight, Lexend_500Medium, Lexend_800ExtraBold, useFonts } from '@expo-google-fonts/lexend';

export default function App() {

  let [fontsLoaded, fontError] = useFonts({
    Lexend_200ExtraLight,
    Lexend_500Medium,
    Lexend_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <NoHeaderLayout/>
      </PaperProvider>
    </AuthProvider>
  );
}