import { ApiResponse } from "../types/ApiResponse";
import { TUser } from "../types/User";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  and,

  orderBy,
  deleteDoc,
} from '@firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

const userCollection = collection(FIRESTORE, 'users')

const get = async (id: string): Promise<ApiResponse<TUser>> => {
  try {
    const userDoc = await getDoc(doc(userCollection, id.toString()));
    if (userDoc.exists()) {
      const user = { id: userDoc.id, ...userDoc.data() } as TUser;
      return {
        success: true,
        message: 'User found',
        data: user,
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getWhere = async (field: string, operator: any, value: any): Promise<ApiResponse<TUser[]>> => {
  try {
    const q = query(userCollection, where(field, operator, value));
    const userDocs = await getDocs(q);
    const users = userDocs.docs.map((userDoc) => {
      return { id: userDoc.id, ...userDoc.data() } as TUser;
    });
    return {
      success: true,
      message: 'Users found',
      data: users,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getAll = async (): Promise<ApiResponse<TUser[]>> => {
  try {
    const userDocs = await getDocs(userCollection);
    const users = userDocs.docs.map((userDoc) => {
      return { id: userDoc.id, ...userDoc.data() } as TUser;
    });
    return {
      success: true,
      message: 'Users found',
      data: users,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const create = async (data: TUser): Promise<ApiResponse<TUser>> => {
  try {
    // valitade if user exists
    const userEmailExists = await getWhere('email', '==', data.email);
    if (userEmailExists.data.length > 0) {
      throw new Error('User email already exists');
    }
    const userNameExists = await getWhere('userName', '==', data.userName);
    if (userNameExists.data.length > 0) {
      throw new Error('User name already exists');
    }

    const newUserRef = await getUserRef(data.id);
    delete data.id
    await setDoc(newUserRef, data);

    const user = { id: newUserRef.id, ...data } as TUser;
    return {
      success: true,
      message: 'User created',
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const update = async ( data: any): Promise<ApiResponse<TUser>> => {
  try {
    const userDoc = await getDoc(doc(userCollection, data.id.toString()));
    if (userDoc.exists()) {
      delete data.id;
      await setDoc(doc(userCollection, data.id.toString()), {
        ...data,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      const user = { id: userDoc.id, ...data } as TUser;
      return {
        success: true,
        message: 'User updated',
        data: user,
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getUserRef = async (id: string) => {
  return doc(userCollection, id.toString());
}

const remove = async (id: number) => {
  return {};
}

const userService = {
  get,
  getAll,
  create,
  update,
  remove,
  getUserRef
}

export default userService;