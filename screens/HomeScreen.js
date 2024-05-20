import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Bienvenue sur Swipet</Text>
      <TouchableOpacity
        style={[styles.button]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Inscription</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
    // fontFamily: 'Montserrat',
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain' //https://reactnative.dev/docs/image-style-props#resizemode
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 100,
    marginTop: 50
  },
  button: {
    backgroundColor: '#5BBDF4', 
    width: '65%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 60,
    borderWidth: 1.5
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold'
  },
  signInButton: {
    backgroundColor: '#ffffff',
  }
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
