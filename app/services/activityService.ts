import { ApiResponse } from "../types/ApiResponse";
import { TActivity } from "../types/Activity";

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


const activityCollection = collection(FIRESTORE, 'activity')

const get = async (id: string): Promise<ApiResponse<TActivity>> => {
  try {
    const activityDoc = await getDoc(doc(activityCollection, id));
    if (activityDoc.exists()) {
      const activity = { id: activityDoc.id, ...activityDoc.data() } as TActivity;
      return {
        success: true,
        message: 'activity found',
        data: activity,
      }
    } else {
      throw new Error('activity not found');
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getWhere = async (field: string, operator: any, value: any): Promise<ApiResponse<TActivity[]>> => {
  try {
    const q = query(activityCollection, where(field, operator, value));
    const activityDocs = await getDocs(q);
    const activity = activityDocs.docs.map((activityDoc) => {
      return { id: activityDoc.id, ...activityDoc.data() } as TActivity;
    });
    return {
      success: true,
      message: 'activity found',
      data: activity,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getAll = async (): Promise<ApiResponse<TActivity[]>> => {
  try {
    const q = query(activityCollection);
    const activityDocs = await getDocs(q);
    const volunteeringActivities = activityDocs.docs.map((activityDoc) => {
      return { id: activityDoc.id, ...activityDoc.data() } as TActivity;
    });
    return {
      success: true,
      message: 'activity found',
      data: volunteeringActivities,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const create = async (data: TActivity): Promise<ApiResponse<TActivity>> => {
  try {
    const newactivityRef = await addDoc(activityCollection, {
      ...data,
    });
    const activity = { id: newactivityRef.id, ...data } as TActivity;
    return {
      success: true,
      message: 'activity added',
      data: activity,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const update = async (activity: TActivity): Promise<ApiResponse<TActivity>> => {
  try {
    const activityRef = doc(activityCollection, activity.id);
    delete activity.id;
    await setDoc(activityRef, {
      ...activity,
    });
    return {
      success: true,
      message: 'activity updated',
      data: activity,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const remove = async (id: string): Promise<ApiResponse<TActivity>> => {
  try {
    const activityRef = doc(activityCollection, id);
    const activityDoc = await getDoc(activityRef);
    if (activityDoc.exists()) {
      const activity = { id: activityDoc.id, ...activityDoc.data() } as TActivity;
      await deleteDoc(activityRef);
      return {
        success: true,
        message: 'activity deleted',
        data: activity,
      }
    } else {
      throw new Error('activity not found');
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const activityService = {
  get,
  getWhere,
  getAll,
  create,
  update,
  remove,
}

export default activityService;