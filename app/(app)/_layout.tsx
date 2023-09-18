import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../../provider/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
  const { signOut, session } = useAuth();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#151515',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="index"
        redirect={!session}
        options={{
          title: 'SupaList',
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
