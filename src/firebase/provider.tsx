'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { FirebaseServices } from '.';

const FirebaseContext = createContext<FirebaseServices | null>(null);

export function FirebaseProvider({
  children,
  services,
}: {
  children: ReactNode;
  services: FirebaseServices;
}) {
  return (
    <FirebaseContext.Provider value={services}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  return useFirebase().app;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useFirestore() {
  return useFirebase().firestore;
}
