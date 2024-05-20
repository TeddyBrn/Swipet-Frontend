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



export default function HomeScreen({ navigation }) {
  const [loginButtonStyle, setLoginButtonStyle] = useState({
  });
  const [signUpButtonStyle, setSignUpButtonStyle] = useState({
  });

  const handleSignUpPressIn = () => {
    setSignUpButtonStyle((prevStyle) => ({
      backgroundColor: prevStyle.borderColor,
      borderColor: prevStyle.backgroundColor,
    }));
  };

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
      <TouchableOpacity style={[styles.signupButton, signUpButtonStyle]} 
      activeOpacity={0.8} 
      onPressIn={handleSignUpPressIn} 
      onPress={() => navigation.navigate("ProfilUtilisateur")}>
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
    fontFamily: 'Montserrat',
  },
  logoContainer: {
    alignItems: 'center',//centrer sur axe secondaire (horizontale)
    // borderColor : 'red',
    // borderWidth : 2,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain', //https://reactnative.dev/docs/image-style-props#resizemode
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 100, 
    marginTop: 50,
    
  },
  signupButton: {
    backgroundColor: '#5BBDF4', // #5BBDF4 ?
    width: '80%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 60,
    borderWidth: 2,
    
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
    marginBottom: 150, 
    borderWidth: 2,
    backgroundColor: '#ffffff',
    borderColor: 'black',
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