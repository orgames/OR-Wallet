'use client';
import { initializeFirebase, FirebaseProvider } from '.';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = initializeFirebase();
  return <FirebaseProvider services={services}>{children}</FirebaseProvider>;
}
