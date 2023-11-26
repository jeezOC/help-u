import React, { createContext, useEffect } from 'react';
import { TUser, TUserType } from '../types/User';
import authService from '../services/authService';
import userService from '../services/userService';
import useToast from '../hooks/useToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TAuthContext = {
  user: TUser,
  handleLogin: (email: string, passwd: string) => Promise<{ success: boolean }>,
  handleRegister: (email: string, passwd: string, userName: string) => Promise<{ success: boolean }>,
  handleLogout: () => Promise<{ success: boolean }>
  startUp: () => void
  isLoading: boolean
  updateSession: (user: TUser) => Promise<{ success: boolean }>
}

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

interface IAuthProvider {
  children: React.ReactNode
}


const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = React.useState<TUser>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    startUp();
  }, [])

  const startUp = async () => {
    setIsLoading(true);
    const userSession = await AsyncStorage.getItem('userSession');
    if (userSession !== null) {
      setUser(JSON.parse(userSession).user);
    } else {
      setUser(null);
      AsyncStorage.removeItem('userSession');
    }
    setIsLoading(false);
  }

  const handleLogin = async (email: string, passwd: string): Promise<{ success: boolean }> => {
    setIsLoading(true);
    const { success, data: firebaseUser, message } = await authService.login(email, passwd);
    if (success) {
      const { success, data: user, message } = await userService.get(firebaseUser.uid);
      if (success) {
        updateSession(user);
        toast({
          type: 'success',
          message: `Hola ${user.userName}!`
        })
        setIsLoading(false);
        return { success: true };
      } else {
        setUser(null);
        toast({
          type: 'error',
          message
        })
        setIsLoading(false);
        return { success: false };
      }
    } else {
      setUser(null);
      toast({
        type: 'error',
        message
      })
      setIsLoading(false);
      return { success: false };
    }
  }

  const updateSession = async (user: TUser): Promise<{ success: boolean }> => {
    setUser(user);
    AsyncStorage.setItem('userSession', JSON.stringify({ user }));
    return { success: true };
  }


  const handleRegister = async (email: string, passwd: string, userName: string): Promise<{ success: boolean }> => {
    setIsLoading(true);
    const { success, data: firebaseUser, message } = await authService.signin(email, passwd);
    if (success) {
      const { success, data: user, message } = await userService.create({ id: firebaseUser.uid, email, userName, onBoardingCompleted: false, onBoardingStep:2 });
      if (success) {
        updateSession(user);
        toast({
          type: 'success',
          message: `Usuario creado con éxito!`
        })
        setIsLoading(false);
        return { success: true };
      } else {
        setUser(null);
        toast({
          type: 'error',
          message
        })
        setIsLoading(false);
        return { success: false };
      }
    } else {
      setUser(null);
      toast({
        type: 'error',
        message
      })
      setIsLoading(false);
      return { success: false };
    }
  }

  const handleLogout = async (): Promise<{ success: boolean }> => {
    setIsLoading(true);
    const { success, message } = await authService.logout();
    if (success) {
      setUser(null);
      AsyncStorage.removeItem('userSession');
      toast({
        type: 'success',
        message: 'Hasta pronto!'
      })
      setIsLoading(false);
      return { success: true };
    } else {
      toast({
        type: 'error',
        message
      })
      setIsLoading(false);
      return { success: false };
    }
  }

  const values = {
    user,
    handleLogin,
    handleRegister,
    handleLogout,
    startUp,
    isLoading,
    updateSession
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;