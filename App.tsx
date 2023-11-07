import { PaperProvider } from 'react-native-paper';
import AuthProvider from './app/context/AuthContext';
import NoHeaderLayout from './app/layouts/NoHeaderLayout';


export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NoHeaderLayout/>
      </PaperProvider>
    </AuthProvider>
  );
}

