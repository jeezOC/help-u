import {FIREBASE_STORAGE} from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
import { ApiResponse } from '../types/ApiResponse';

type File = Blob | Uint8Array | ArrayBuffer;

const postFile = async (filename: string, file: File): Promise<ApiResponse<string>> => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, filename);
    const fileRef = await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(fileRef.ref);
    return {
      success: true,
      message: 'File uploaded',
      data: fileUrl,
    }
  } catch (error) {
    console.log('storageService.postFile error: ', error.message || error);
    return {
      success: false,
      message: error.message,
    }
  }
}

const deleteFile = async (fileUrl: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, fileUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
  }
}

const storageService = {
  postFile,
  deleteFile,
}

export default storageService;