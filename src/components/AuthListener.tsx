'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authSore';

const AuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "",
          },
        });
      } else {
        useAuthStore.setState({
          isAuthenticated: false,
          user: null,
        });
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  return null; // This component renders nothing
};

export default AuthListener;
