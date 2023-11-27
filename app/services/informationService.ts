import { ApiResponse } from "../types/ApiResponse";
import { TInformation } from "../types/User";

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
import userService from "./userService";


const informationCollection = collection(FIRESTORE, 'information')

const get = async (id: string): Promise<ApiResponse<TInformation>> => {
  try {
    const informationDoc = await getDoc(doc(informationCollection, id));
    if (informationDoc.exists()) {
      const information = { id: informationDoc.id, ...informationDoc.data() } as TInformation;
      return {
        success: true,
        message: 'Information found',
        data: information,
      }
    } else {
      throw new Error('Information not found');
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getWhere = async (field: string, operator: any, value: any): Promise<ApiResponse<TInformation[]>> => {
  try {
    const q = query(informationCollection, where(field, operator, value));
    const informationDocs = await getDocs(q);
    const information = informationDocs.docs.map((informationDoc) => {
      return { id: informationDoc.id, ...informationDoc.data() } as TInformation;
    });
    return {
      success: true,
      message: 'Information found',
      data: information,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const create = async (data: TInformation): Promise<ApiResponse<TInformation>> => {
  try {
    const newInformationRef = await getInformationRef(data.id);
    delete data.id;
    await setDoc(newInformationRef, {
      ...data,
    });
    const information = { id: newInformationRef.id, ...data } as TInformation;
    return {
      success: true,
      message: 'Information added',
      data: information,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const update = async (information: TInformation): Promise<ApiResponse<TInformation>> => {
  try {
    const informationRef = await getInformationRef(information.id);
    delete information.id;
    await setDoc(informationRef, {
      ...information,
    }, { merge: true });
    return {
      success: true,
      message: 'Information updated',
      data: { ...information, id: informationRef.id },
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const remove = async (id: string): Promise<ApiResponse<TInformation>> => {
  try {
    await deleteDoc(doc(informationCollection, id.toString()));
    return {
      success: true,
      message: 'Information deleted',
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getInformationRef = async (id: string) => {
  return doc(informationCollection, id);
}

const informationService = {
  get,
  getWhere,
  create,
  update,
  remove,
  getInformationRef,
}

export default informationService;