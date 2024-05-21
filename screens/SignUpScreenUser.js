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
import Checkbox from 'expo-checkbox';
const { checkBody } = require("../modules/checkbody");
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function ConnectionScreen({ navigation }) {

    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [city, setCity] = useState('');
    // const [age, setAge] = useState('');


const handleCheckbox1 = ()  => {
    if (checkbox2 === false) {
        setCheckbox1(true)
    } else {
        setCheckbox2(false);
        setCheckbox1(true)
    }
};

const handleCheckbox2 = ()  => {
    if (checkbox1 === false) {
        setCheckbox2(true)
    } else {
        setCheckbox1(false);
        setCheckbox2(true)
    }
};

let role = '';
if (checkbox1 === true && checkbox2 === false) {role = 'garder'};
if (checkbox2 === true && checkbox1 === false) {role = 'faire garder'};

const handleConnexion = () => {

        // if (
        //     // !checkBody(req.body, [
        //     //   "firstname",
        //     //   "name",
        //     //   "email",
        //     //   "password",
        //     //    role,
        //     //   "city",
        //     //   // "birthDate",
        //     // ])
        //   ) {
        //     res.json({ result: false, error: "Missing or empty fields" });
        //     return;
        //   } else 
          if (!EMAIL_REGEX.test(email)) {
            res.json({ result: false, error: "Wrong email format" })
          } else {
            fetch('http://192.168.233.47:8081/profils/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname: name, email, password, role, city }),
            }).then(response => response.json())
            .then(data => {
            data.result && dispatch(login({ token: data.token, email }));
            });
            navigation.navigate("SignUpAnimal")
          }      
    };


import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function ConnectionScreen({ navigation }) {
  const [lastName, setLastName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox1, setCheckbox1] = useState('');
  const [checkbox2, setCheckbox2] = useState('');
  const [city, setCity] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={60} color="#E06359" />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Profil</Text>
            <Text style={styles.topText}>Utilisateur</Text>
          </View>
          <Image
            source={require('../assets/miniLogo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setLastName(value)}
            value={lastName}
            placeholder="Nom"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setFirstname(value)}
            value={firstname}
            placeholder="Prénom"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
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
          <TextInput
            style={styles.input}
            onChangeText={(value) => setCity(value)}
            value={city}
            placeholder="Ville"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <Text style={styles.titleCheckbox}>Vous souhaitez :</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Text style={styles.label}>Garder</Text>
              <Checkbox
                value={checkbox1}
                onValueChange={setCheckbox1}
                style={styles.check}
              />
            </View>
            <View style={styles.checkbox}>
              <View>
                <Text style={styles.label}>Faire</Text>
                <Text style={styles.label}>garder</Text>
              </View>
              <Checkbox
                value={checkbox2}
                onValueChange={setCheckbox2}
                style={styles.check}
              />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setName(value)}
                    value={name}
                    placeholder="Nom"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setFirstname(value)}
                    value={firstname}
                    placeholder="Prénom"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                />
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
                <Text>Vous souhaitez :</Text>
                <View style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                <Text style={styles.label}>Garder</Text>
                <Checkbox
                    value={checkbox1}
                    onValueChange={()=>handleCheckbox1()}
                    style={styles.check}
                />
                </View>
                <View style={styles.checkbox}>
                <Text style={styles.label}>Faire garder</Text>
                <Checkbox
                    value={checkbox2}
                    onValueChange={()=>handleCheckbox2()}
                    style={styles.check}
                />
                </View>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setCity(value)}
                    value={city}
                    placeholder="Ville"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}
                    onPress={() => handleConnexion()}
                >
                    <Text style={styles.connexionButtonText}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
          </View>
          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignUpAnimal')}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  topMid: {
    alignItems: 'center'
  },
  topText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: 'contain'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderRadius: 15,
    borderWidth: 1.5,
    width: '90%',
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1.5,
    marginBottom: 30,
    fontSize: 18,
  },
  titleCheckbox: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 110,
    height: 60,
    borderRadius: 10,
    borderWidth: 1.5
  },
  label: {
    fontSize: 18,
    fontWeight: '500'
  },
  signUpButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#73A246'
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold'
  }
});
