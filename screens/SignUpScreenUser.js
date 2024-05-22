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
  Button,
  Pressable
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { calculAge } from '../modules/calculAge';

export default function SignUpScreenUser({ navigation }) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState('');

  // ImagePicker

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // CheckBox

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const handleCheckbox1 = () => {
    if (checkbox2 === false) {
      setCheckbox1(true);
      setRole('garder');
    } else {
      setCheckbox2(false);
      setCheckbox1(true);
      setRole('garder');
    }
  };

  const handleCheckbox2 = () => {
    if (checkbox1 === false) {
      setCheckbox2(true);
      setRole('faire garder');
    } else {
      setCheckbox1(false);
      setCheckbox2(true);
      setRole('faire garder');
    }
  };

  // if (checkbox1 === true && checkbox2 === false) {
  //   setRole('garder');
  // }
  // if (checkbox2 === true && checkbox1 === false) {
  //   setRole('faire garder');
  // }

  // DatePicker

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn(date);
    setBirthDate(date);
    hideDatePicker();
    
  };

  const handleConnexion = () => {
    fetch('http://192.168.1.30:3000/profils/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        city,
        role,
        birthDate
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.result && dispatch(login({ token: data.token, email }));
        navigation.navigate('SignUpAnimal');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={60} color="#33464d" />
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
          <TouchableOpacity
            style={styles.imagePicker}
            activeOpacity={0.8}
            onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image
                source={require('../assets/add-image.png')}
                style={{ width: 60, height: 60, color: '#555' }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.inputContain}>
            <View style={styles.input}>
              <Ionicons name="person" size={20} color="#555" />
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setLastname(value)}
                value={lastname}
                placeholder="Nom"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.input}>
              <Ionicons name="person" size={20} color="#555" />
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
                placeholder="Prénom"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            <Pressable style={styles.input} onPress={showDatePicker}>
              <Ionicons name="calendar" size={20} color="#333" />
              <Text style={styles.inputText}>Date de Naissance {birthDate && 'birthDate'}</Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View style={styles.input}>
              <Ionicons name="mail" size={20} color="#555" />
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setEmail(value)}
                value={email}
                placeholder="E-mail"
                placeholderTextColor="grey"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.input}>
              <Ionicons name="lock-closed" size={20} color="#555" />
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Mot de passe"
                placeholderTextColor="grey"
                secureTextEntry
              />
            </View>
            <View style={styles.input}>
              <Ionicons name="business" size={20} color="#555" />
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setCity(value)}
                value={city}
                placeholder="Ville"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
          </View>

          <Text style={styles.titleCheckbox}>Vous souhaitez :</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Text style={styles.label}>Garder</Text>
              <Checkbox
                value={checkbox1}
                onValueChange={() => handleCheckbox1()}
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
                onValueChange={() => handleCheckbox2()}
                style={styles.check}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={0.8}
            // onPress={() => navigation.navigate('SignUpAnimal')}
            onPress={() => handleConnexion()}
          >
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
    marginBottom: 15,
    
  },
  topMid: {
    alignItems: 'center'
  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: 'contain'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  imagePicker: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#33464d',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -30
  },
  image: {
    borderRadius: 50,
    width: '100%',
    height: '100%'
  },
  inputContain: {
    width: '95%',
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  input: {
    borderRadius: 10,
    borderBottomWidth: 1.5,
    width: '80%',
    padding: 10,
    marginVertical: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#33464d'
  },
  inputText: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#5a7869'
  },
  titleCheckbox: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    paddingVertical: 20,
    color: '#33464d'
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 130,
    height: 60,
    borderRadius: 5,
    borderWidth: 1.5,
    backgroundColor: '#efefef',
    borderColor: '#33464d'
  },
  label: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  signUpButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#73A246'
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold'
  }
});
