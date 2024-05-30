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

export default function HomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Proposal')}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
          
        />
      </TouchableOpacity>
      <Text style={styles.title}>Bienvenue sur Swipet</Text>
      <TouchableOpacity
        style={[styles.button]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={[styles.buttonText, styles.color]}>Inscription</Text>
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
    fontSize: 33,
    marginBottom: 100,
    marginTop: 50,
    fontFamily: 'PoetsenOne-Regular',
    color: '#33464d'
  },
  button: {
    backgroundColor: '#5a7869',
    borderColor: '#33464d',
    width: '55%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 60,
    borderWidth: 1.5
  },
  buttonText: {
    color: '#33464d',
    fontSize: 25,
    fontFamily: 'Montserrat-Bold'
  },
  signInButton: {
    backgroundColor: '#ffffff'
  },
  color: {
    color: 'white'
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
onPress={() => navigation.navigate('TabNavigator', { screen: 'Swipe' })}
navigation.navigate('TabNavigator', { screen: 'Swipe' });
*/
