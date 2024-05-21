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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function ConnectionScreen({ navigation }) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox1, setCheckbox1] = useState('');
  const [checkbox2, setCheckbox2] = useState('');
  const [city, setCity] = useState('');

  const gender = ['Male', 'Female'];
  const typeAnimal = ['Male', 'Female'];

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
                    onChangeText={(value) => setAge(value)}
                    value={age}
                    placeholder="Age"
                    placeholderTextColor="grey"
                    keyboardType="date"
                    autoCapitalize="none"
                />
                 <Select value={type} onChange={(value) => setType(value)} style={styles.input}>
                    <Option value="chat">Chat</Option>
                    <Option value="Chien">Chien</Option>
                    <Option value="Lapin">Lapin</Option>
                </Select>
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(value) => setType(value)}
                    value={type}
                    placeholder="Type"
                    placeholderTextColor="grey"    
                    autoCapitalize="none"
                /> */}
                <Select value={gender} onChange={(value) => setGender(value)} style={styles.input}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(value) => setGender(value)}
                    value={gender}
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                /> */}
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => setBio(value)}
                    value={bio}
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}
                    onPress={handleAddAnimal}
                >
                    <Text style={styles.connexionButtonText}>Ajouter un animal</Text>
                </TouchableOpacity>

                 <TextInput
                    style={styles.input}
                    onChangeText={(value) => setDetail(value)}
                    value={detail}
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
                <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}
                    onPress={handleConnexion}
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
    // checkboxContainer : {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     width: '80%',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    // },
    // checkbox: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     width: 100,
    //     height: 60,
    //     borderRadius: 10,
    //     padding: 10,
    //     borderWidth: 2,
    //     // fontFamily: 'Montserrat',
    // },
    logo: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
        },
})
