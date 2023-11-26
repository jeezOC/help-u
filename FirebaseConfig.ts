import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getAnalytics } from '@firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';


const firebaseConfig = {
	apiKey: 'AIzaSyAP4cFfmrX1EcYBwBiDDlt1UcQ3bDoSRj0',
	authDomain: 'help-u-app.firebaseapp.com',
	projectId: 'help-u-app',
	storageBucket: 'help-u-app.appspot.com',
	messagingSenderId: '628168489758',
	appId: '1:628168489758:web:575edd65c1b63979bee70f',
};

const FIREBASE_APP = initializeApp(firebaseConfig);

let FIREBASE_AUTH;

if (Platform.OS === 'android') {
	FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
		persistence: getReactNativePersistence(ReactNativeAsyncStorage),
	});
} else {
	FIREBASE_AUTH = getAuth(FIREBASE_APP);
}

export const FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH };
