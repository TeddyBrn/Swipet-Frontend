import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    
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



    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Image source={require('../assets/back.jpg')} style={styles.backButton} />
                </TouchableOpacity>
            </View>
            <Text>Profil Utilisateur</Text>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.jpg')} style={styles.logo} />
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    signupButton: {
        backgroundColor: '#8FD14F',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 20,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#73A246',
        alignItems: 'flex-end',

    },
    connexionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        borderRadius: 20,
        borderWidth: 1.5,
        width: '100%',
        padding: 10,
        marginVertical: 10,
        marginBottom: 20,
        borderWidth: 2,
        // fontFamily: 'Montserrat',
    },
    checkboxContainer : {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        height: 60,
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        // fontFamily: 'Montserrat',
    },
    logo: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
        },
})