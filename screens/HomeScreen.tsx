import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [loginButtonStyle, setLoginButtonStyle] = useState({
    backgroundColor: '#ffffff',
    borderColor: '#1E90FF',
  });

  const handleLoginPressIn = () => {
    setLoginButtonStyle((prevStyle) => ({
      backgroundColor: prevStyle.borderColor,
      borderColor: prevStyle.backgroundColor,
    }));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>


      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Bienvenue sur Swipet</Text>
      <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}>
        <Text style={styles.signupButtonText}>Inscription</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.loginButton, loginButtonStyle]}
        activeOpacity={0.8}
        onPressIn={handleLoginPressIn}
        onPress={() => navigation.navigate("Connection")}
      >
        <Text style={styles.loginButtonText}>Connexion</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',//centrer sur axe principal (verticale)
    alignItems: 'center',//centrer sur axe secondaire (horizontale)
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',//centrer sur axe secondaire (horizontale)
    marginBottom: 20,
    // borderColor : 'red',
    // borderWidth : 2,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain', //https://reactnative.dev/docs/image-style-props#resizemode
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  signupButton: {
    backgroundColor: '#1E90FF', // #5BBDF4 ?
    width: '80%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  signupButtonText: {
    color: 'black',
    fontSize: 18,
  },
  loginButton: {
    borderWidth: 1.5,
    width: '80%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
  },
});

/*
Dans dossier assets
logo.jpg

Dans app.tsx 
import Connection from './screens/HomeScreen';

...

<Stack.Screen name="Home" component={HomeScreen} />

...

*/