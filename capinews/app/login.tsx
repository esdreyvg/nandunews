import React from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Inicio de sesión exitoso');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error en Google Login', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Iniciar sesión con Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
