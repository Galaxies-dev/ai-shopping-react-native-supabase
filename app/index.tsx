import {
  Alert,
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import React from 'react';
import { supabase } from '../config/initSupabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else Alert.alert('Check your email for the confirmation link to complete your account!');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SupaList</Text>
      <Text style={styles.subheader}>Your AI Shopping list</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="john@doe.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={{ color: '#fff' }}>Sign in</Text>
      </TouchableOpacity>
      <Button onPress={onSignUpPress} title="Create Account" color={'#fff'}></Button>

      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1, justifyContent: 'center' },
          ]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  subheader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#2b825b',
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: '#363636',
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#2b825b',
    padding: 12,
    borderRadius: 4,
  },
});

export default Login;
