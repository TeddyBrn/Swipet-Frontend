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
    CheckBox
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addAnimal, login } from '../reducers/users';


export default function ProfilScreen({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value);

    const [lastname, setLastname] = useState(lastname);
    const [city, setCity] = useState(city);
    const [firstname, setFirstname] = useState(firstname);
    const [email, setEmail] = useState(email);

    const handleChange = () => {

        fetch(`http://192.168.1.30:3000/settings/editprofil/${user.token}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            city: city,
            email: email,
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            data.result &&
              dispatch(login({ lastname, firstname, animalType, city, email }));
                setCity(city); setFirstname(firstname); setLastname(lastname); setEmail(email);
            })
         }

        const handleBackPress = () => {
            navigation.goBack();
        };

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
                        </View>
                        <Image
                            source={require('../assets/miniLogo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => setLastname(value)}
                            value={lastname}
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
                            onChangeText={(value) => setCity(value)}
                            value={city}
                            placeholder="Ville"
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
                        <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}
                            onPress={() => navigation.navigate("TabNavigator")}
                        >
                            <Text style={styles.connexionButtonText}>Confirmer</Text>
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
        backgroundColor: '#ffffff',
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 30
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
    checkboxContainer: {
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
