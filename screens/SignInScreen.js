import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ConnectionScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={60} color="#E06359" />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="E-mail"
          placeholderTextColor="grey"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="Mot de passe"
          placeholderTextColor="grey"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.signInButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('TabNavigator')}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
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
  backContainer: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  backButton: {
    width: 60,
    height: 40,
    resizeMode: 'contain'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 70
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain'
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  input: {
    borderRadius: 15,
    width: '100%',
    padding: 10,
    marginVertical: 10,
    marginBottom: 30,
    borderWidth: 2,
    paddingLeft: 20

    // fontFamily: 'Montserrat',
  },
  signInButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginTop: 10,
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#73A246'
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

/*
Dans dossier assets
logo.jpg
back.jpg
Dans app.tsx 
import Connection from './screens/ConnectionScreen';

...

<Stack.Screen name="Connection" component={Connection} />

...

*/
