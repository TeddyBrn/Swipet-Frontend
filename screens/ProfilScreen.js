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




export default function ProfilScreen({ navigation }) {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');

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
            <Text>Profil</Text>
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
                    onChangeText={(value) => setYear(value)}
                    value={year}
                    placeholder="Age"
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