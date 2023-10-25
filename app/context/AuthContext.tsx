import { FIREBASE_AUTH } from '../../FirebaseConfig';
import React, { createContext } from 'react';

export const AuthContext = createContext({});

interface IAuthProvider {
  children: React.ReactNode
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const auth = FIREBASE_AUTH
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;