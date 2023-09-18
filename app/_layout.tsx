import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth, AuthProvider } from '../provider/AuthProvider';

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (tabs) group
    const inAuthGroup = segments[0] === '(app)';

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace('/(app)');
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace('/');
    }
  }, [session, initialized]);

  return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
