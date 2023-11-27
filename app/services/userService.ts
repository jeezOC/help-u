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
import informationService from "./informationService";
import { getIn } from "formik";

const userCollection = collection(FIRESTORE, 'users')

const get = async (id: string): Promise<ApiResponse<TUser>> => {
  try {
    const userDoc = await getDoc(doc(userCollection, id));
    const { data: informationDoc } = await informationService.get(userDoc.data().information.id);
    if (userDoc.exists()) {
      const user = { id: userDoc.id, ...userDoc.data(), information: informationDoc };
      return {
        success: true,
        message: 'User found',
        data: user as TUser,
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

const update = async (data: any): Promise<ApiResponse<TUser>> => {
  try {
    const userRef = await getUserRef(data.id);
    const informationRef = await informationService.getInformationRef(data.information.id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      delete data.id;
      await setDoc(userRef, {
        ...data,
        information: informationRef,
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
  return doc(userCollection, id);
}

const remove = async (id: number) => {
  return {};
}

const userService = {
  get,
  getAll,
  getWhere,
  create,
  update,
  remove,
  getUserRef
}

export default userService;