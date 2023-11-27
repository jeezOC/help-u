import { PaperProvider } from 'react-native-paper';
import AuthProvider from './app/context/AuthContext';
import NoHeaderLayout from './app/layouts/NoHeaderLayout';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Lexend_200ExtraLight, Lexend_500Medium, Lexend_800ExtraBold, useFonts } from '@expo-google-fonts/lexend';
import ActivitiesProvider from './app/context/ActivitiesContext';

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
    <RootSiblingParent>
      <AuthProvider>
        <PaperProvider>
          <ActivitiesProvider>
            <NoHeaderLayout />
          </ActivitiesProvider>
        </PaperProvider>
      </AuthProvider>
    </RootSiblingParent>
  );
}