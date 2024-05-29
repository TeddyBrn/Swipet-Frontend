import React, { useState } from "react";
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
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users';
import { BACKEND_ADRESS } from '../data/urlData';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignInScreen({ navigation }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [signInPassword, setSignInPassword] = useState("");

  const dispatch = useDispatch();

  const handleConnection = () => {
    fetch(`${BACKEND_ADRESS}/profils/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (EMAIL_REGEX.test(signInEmail)) {
          console.log(data)
          if (data.result) {
            dispatch(
              login({
                token: data.data.token,
                email: signInEmail,
                firstname: data.data.firstname,
                lastname: data.data.lastname,
                role: data.data.role,
                city: data.data.city
              })
            );
            navigation.navigate("TabNavigator", { screen: "Swipe" });
          } else {
            setEmailError(true);
          }
        } else {
          setEmailError(true);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={60} color="#33464d" />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        {emailError && (
          <Text style={styles.error}>Invalid email address or password</Text>
        )}

        <View style={styles.input}>
          <Ionicons name="mail" size={20} color="#555" />
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => setSignInEmail(value)}
            value={signInEmail}
            placeholder="E-mail"
            placeholderTextColor="grey"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.input}>
          <Ionicons name="lock-closed" size={20} color="#555" />
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => setSignInPassword(value)}
            value={signInPassword}
            placeholder="Mot de passe"
            placeholderTextColor="grey"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          activeOpacity={0.8}
          onPress={() => handleConnection()}
          // onPress={() => navigation.navigate('TabNavigator', { screen: 'Swipe' })}
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  backContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButton: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    borderBottomWidth: 1.5,
    width: "80%",
    padding: 10,
    marginVertical: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#33464d",
  },
  inputText: {
    fontSize: 18,
    paddingLeft: 10,
    color: "#5a7869",
    width: "90%",
  },
  signInButton: {
    backgroundColor: "#5a7869",
    borderColor: "#33464d",
    width: "55%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1.5,
    marginTop: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
    fontFamily: "Montserrat-Bold",
  },
  error: {
    color: "#e23636",
  },
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
