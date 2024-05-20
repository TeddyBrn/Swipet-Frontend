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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function ConnectionScreen({ navigation }) {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
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
            <Text style={styles.topText}>Animal</Text>
          </View>
          <Image
            source={require('../assets/miniLogo.png')}
            style={styles.logo}
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
          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TabNavigator')}>
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
})