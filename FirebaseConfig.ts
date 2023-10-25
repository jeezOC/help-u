import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyAP4cFfmrX1EcYBwBiDDlt1UcQ3bDoSRj0',
	authDomain: 'help-u-app.firebaseapp.com',
	projectId: 'help-u-app',
	storageBucket: 'help-u-app.appspot.com',
	messagingSenderId: '628168489758',
	appId: '1:628168489758:web:575edd65c1b63979bee70f',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}) 
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
