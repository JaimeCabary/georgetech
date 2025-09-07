// src/services/products.js
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
//   orderBy
} from 'firebase/firestore';
import { db } from './firebase';

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, product: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Product not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getFeaturedProducts = async () => {
  try {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    return { success: true, product: { id: docRef.id, ...productData } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, productData);
    return { success: true, product: { id, ...productData } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, 'products', id));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};