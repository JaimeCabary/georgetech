// // src/hooks/useProducts.js
// import { useState, useEffect } from 'react';
// import { collection, doc,  addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '../services/firebase';
// import { featuredProducts } from '../utils/constants';

// export const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         // For development, use mock data
//         // In production, fetch from Firestore
//         setProducts(featuredProducts);
//         setLoading(false);
        
//         // Uncomment this for Firestore integration:
//         /*
//         const querySnapshot = await getDocs(collection(db, 'products'));
//         const productsData = [];
//         querySnapshot.forEach((doc) => {
//           productsData.push({ id: doc.id, ...doc.data() });
//         });
//         setProducts(productsData);
//         setLoading(false);
//         */
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const getProductById = async (id) => {
//     try {
//       // For development, use mock data
//       const product = featuredProducts.find(p => p.id === id);
//       return product;
      
//       // Uncomment for Firestore:
//       /*
//       const docRef = doc(db, 'products', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         return { id: docSnap.id, ...docSnap.data() };
//       }
//       return null;
//       */
//     } catch (err) {
//       setError(err.message);
//       return null;
//     }
//   };

//   const addProduct = async (productData) => {
//     try {
//       const docRef = await addDoc(collection(db, 'products'), productData);
//       return { id: docRef.id, ...productData };
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const updateProduct = async (id, productData) => {
//     try {
//       const docRef = doc(db, 'products', id);
//       await updateDoc(docRef, productData);
//       return { id, ...productData };
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'products', id));
//       return true;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   return {
//     products,
//     loading,
//     error,
//     getProductById,
//     addProduct,
//     updateProduct,
//     deleteProduct
//   };
// };



import { useState, useEffect } from 'react';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { featuredProducts } from '../utils/constants';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Use mock data immediately for fast loading
        setProducts(featuredProducts);
        
        // Then try to fetch from Firestore in the background
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          
          if (productsData.length > 0) {
            setProducts(productsData);
          }
        } catch (firestoreError) {
          console.warn('Firestore not available, continuing with mock data:', firestoreError);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const getProductById = async (id) => {
    try {
      // First check local products
      const localProduct = products.find(p => p.id === id);
      if (localProduct) return localProduct;
      
      // If not found, try Firestore (you'd need to implement this)
      return null;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const addProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), productData);
      const newProduct = { id: docRef.id, ...productData };
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, productData);
      setProducts(prev => prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      ));
      return { id, ...productData };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
  };
};