// src/services/storage.js
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (file, path = 'products/') => {
  try {
    const storageRef = ref(storage, path + file.name);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const uploadMultipleImages = async (files, path = 'products/') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, path));
    const results = await Promise.all(uploadPromises);
    
    const successfulUploads = results.filter(result => result.success);
    const failedUploads = results.filter(result => !result.success);
    
    return {
      success: failedUploads.length === 0,
      urls: successfulUploads.map(result => result.url),
      errors: failedUploads.map(result => result.error)
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteImage = async (url) => {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getImageUrl = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return { success: true, url };
  } catch (error) {
    return { success: false, error: error.message };
  }
};