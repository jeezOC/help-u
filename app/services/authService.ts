import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const user = userCredential.user;
    console.log(user);  
    return {
      success: true,
      message: 'User logged in',
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const signin = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const user = userCredential.user;
    console.log(user);
    return {
      success: true,
      message: 'User signed in',
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const logout = async () => {
  try {
    await signOut(FIREBASE_AUTH);
    return {
      success: true,
      message: 'User logged out',
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const authService = {
  login,
  signin,
  logout,
}

export default authService;