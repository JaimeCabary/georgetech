// // // src/contexts/AuthContext.js
// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { 
// //   createUserWithEmailAndPassword, 
// //   signInWithEmailAndPassword, 
// //   signOut, 
// //   onAuthStateChanged,
// //   signInWithPopup,
// //   GoogleAuthProvider 
// // } from 'firebase/auth';
// // import { auth } from '../services/firebase';

// // const AuthContext = createContext();

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setUser(user);
// //       setLoading(false);
// //     });

// //     return unsubscribe;
// //   }, []);

// //   const signup = (email, password) => {
// //     return createUserWithEmailAndPassword(auth, email, password);
// //   };

// //   const login = (email, password) => {
// //     return signInWithEmailAndPassword(auth, email, password);
// //   };

// //   const logout = () => {
// //     return signOut(auth);
// //   };

// //   const googleSignIn = () => {
// //     const provider = new GoogleAuthProvider();
// //     return signInWithPopup(auth, provider);
// //   };

// //   const value = {
// //     user,
// //     signup,
// //     login,
// //     logout,
// //     googleSignIn
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };

// // src/contexts/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut, 
//   onAuthStateChanged,
//   signInWithPopup,
//   GoogleAuthProvider 
// } from 'firebase/auth';
// import { auth } from '../services/firebase';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Admin credentials
//   const ADMIN_CREDENTIALS = {
//     username: 'hyper3',
//     password: 'hyper3',
//     role: 'admin'
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       // Check if there's a stored admin user
//       const storedAdmin = localStorage.getItem('adminUser');
//       if (storedAdmin) {
//         setUser(JSON.parse(storedAdmin));
//       } else {
//         setUser(firebaseUser);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const signup = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email, password) => {
//     // Check if it's admin login
//     if (email === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
//       const adminUser = {
//         uid: 'admin-uid',
//         email: ADMIN_CREDENTIALS.username,
//         displayName: 'Admin User',
//         role: 'admin'
//       };
//       setUser(adminUser);
//       localStorage.setItem('adminUser', JSON.stringify(adminUser));
//       return Promise.resolve({ user: adminUser });
//     }
    
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     localStorage.removeItem('adminUser');
//     return signOut(auth);
//   };

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

  

//   const value = {
//     user,
//     signup,
//     login,
//     logout,
//     googleSignIn
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };



// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile as firebaseUpdateProfile,
  // updateEmail,
  // updatePassword,
  // reauthenticateWithCredential,
  // EmailAuthProvider
} from 'firebase/auth';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'hyper3',
    password: 'hyper3',
    role: 'admin'
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Check if there's a stored admin user
      const storedAdmin = localStorage.getItem('adminUser');
      if (storedAdmin) {
        setUser(JSON.parse(storedAdmin));
      } else {
        setUser(firebaseUser);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    // Check if it's admin login
    if (email === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser = {
        uid: 'admin-uid',
        email: ADMIN_CREDENTIALS.username,
        displayName: 'Admin User',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      return Promise.resolve({ user: adminUser });
    }
    
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    return signOut(auth);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      // For admin user, update local storage
      if (user && user.role === 'admin') {
        const updatedAdmin = { ...user, ...updates };
        setUser(updatedAdmin);
        localStorage.setItem('adminUser', JSON.stringify(updatedAdmin));
        return true;
      }
      
      // For Firebase users
      await firebaseUpdateProfile(auth.currentUser, updates);
      setUser({ ...auth.currentUser, ...updates });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Upload avatar to Firebase Storage
  const uploadAvatar = async (file) => {
    try {
      // For admin user, we can't upload to Firebase Storage
      if (user && user.role === 'admin') {
        throw new Error('Admin users cannot upload avatars');
      }
      
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${user.uid}`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Update the user's profile with the new photoURL
      await firebaseUpdateProfile(auth.currentUser, { photoURL: downloadURL });
      
      // Update the user state
      setUser({ ...auth.currentUser, photoURL: downloadURL });
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  // Delete avatar from Firebase Storage
  const deleteAvatar = async () => {
    try {
      // For admin user, we can't delete from Firebase Storage
      if (user && user.role === 'admin') {
        throw new Error('Admin users cannot delete avatars');
      }
      
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${user.uid}`);
      
      // Delete the file
      await deleteObject(storageRef);
      
      // Update the user's profile to remove photoURL
      await firebaseUpdateProfile(auth.currentUser, { photoURL: null });
      
      // Update the user state
      setUser({ ...auth.currentUser, photoURL: null });
      
      return true;
    } catch (error) {
      console.error('Error deleting avatar:', error);
      throw error;
    }
  };

  const value = {
    user,
    signup,
    login,
    logout,
    googleSignIn,
    updateProfile,
    uploadAvatar,
    deleteAvatar
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};