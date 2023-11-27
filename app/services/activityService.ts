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
  Timestamp,
} from '@firebase/firestore';
import { FIREBASE_STORAGE, FIRESTORE } from '../../FirebaseConfig';
import storageService from "./storageService";


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
      console.log('---- typeof date:', typeof activityDoc.data().date);
      const date = activityDoc.data().date.toDate();
      return { id: activityDoc.id, ...activityDoc.data(), date  } as TActivity;
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
    const response = await fetch(data.bannerImg);
    const bannerImgBlob = await response.blob();
    const { data: bannerImg } = await storageService.postFile(`activity/${data.name}/bannerImg`, bannerImgBlob);
    const images = await Promise.all(data.images.map(async (image, index) => {
      const response = await fetch(image);
      const imageBlob = await response.blob();
      const { data: newImageUrl } = await storageService.postFile(`activity/${data.name}/image-${index}`, imageBlob);
      return newImageUrl;
    }));
    console.log('----------------date',  data.date.toString());
    const timestamp = typeof data.date.toString() === 'string' ? Timestamp.fromDate(new Date(data.date.toString() )) : data.date;
    console.log('----------------timestamp', timestamp);
    const finalData = {
      ...data,
      bannerImg,
      images,
      date: timestamp,
    }

    console.log('---- finalData', finalData);

    const newactivityRef = await addDoc(activityCollection, {
      ...finalData,
    });
    const activity = { id: newactivityRef.id, ...finalData } as TActivity;
    console.log('---- activity', activity);
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