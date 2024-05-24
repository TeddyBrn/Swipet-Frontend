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
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addAnimal, login } from '../reducers/users';

export default function ProfilScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(user)

  const [lastname, setLastname] = useState(user.lastname);
    const [city, setCity] = useState(user.city);
    const [firstname, setFirstname] = useState(user.firstname);
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState(null);

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

  const handleChange = () => {

    fetch(`http://192.168.233.47:3000/settings/editprofile/${user.token}`, {
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
          dispatch(login({ lastname, firstname, city, email }));
            setCity(city); setFirstname(firstname); setLastname(lastname); setEmail(email);
        })
     }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={60}
              color="#33464d"
              style={styles.back}
            />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Profil</Text>
          </View>
          <View style={{ width: 80 }}></View>
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
                placeholder="Prenom"
                placeholderTextColor="grey"
                autoCapitalize="none"
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
            <View style={styles.input}>
              <Ionicons name="business" size={20} color="#555" />
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setEmail(value)}
                value={email}
                placeholder="E-mail"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            <View>
            <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}
                    onPress={() => handleChange()}
                >
                    <Text style={styles.connexionButtonText}>Confirmer</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20
  },
  back: {
    width: 80,
    alignItems: 'center'
  },
  topMid: {
    alignItems: 'center'
  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
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
  }
});
