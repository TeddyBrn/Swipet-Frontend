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
import { useDispatch, useSelector } from 'react-redux';
import { addAnimal, login } from '../reducers/users';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function SignUpScreenAnimal({ navigation }) {

    const dispatch = useDispatch();
    const user= useSelector((state) => state.users.value);
    console.log(user)

    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [bio, setBio] = useState('');
    const [detail, setDetail] = useState('');

  const gender = ['Male', 'Female'];
  const animalType = ['Chien', 'Chat', 'Lapin'];

  const handleAddAnimal = () => {

        fetch(`http://192.168.233.47:3000/profils/signup/animal/${user.token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, year, animalType, gender, bio, detail}),
          }).then(response => response.json())
            .then(data => {
               data.result && dispatch(addAnimal({ token: data.token, name, year, animalType, gender, bio, detail }));
               setName(''); setYear('');   setBio('');
            });
        
}

  const handleConnexion = () => {


        fetch(`http://192.168.233.47:3000/profils/signup/animal/${user.token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, year, animalType, gender, bio, detail}),
            }).then(response => response.json())
            .then(data => {
                console.log(data)
               data.result && dispatch(addAnimal({ name, year, animalType, gender, bio, detail }));
               navigation.navigate('TabNavigator')
            });
};

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
            onChangeText={(value) => setAge(value)}
            value={age}
            placeholder="Age"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setBio(value)}
            value={bio}
            placeholder="Bio"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setDetail(value)}
            value={detail}
            placeholder="Detail"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <SelectDropdown
            data={gender}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem) || 'Genre'}
                  </Text>
                  <Icon
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item) => {
              return (
                <View style={styles.dropdownItemStyle}>
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <SelectDropdown
            data={typeAnimal}
            onSelect={(selectedItem) => {
              console.log(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem) || 'Type : chien, chat ...'}
                  </Text>
                  <Icon
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item) => {
              return (
                <View style={styles.dropdownItemStyle}>
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          
          <TouchableOpacity
            style={styles.signUpButton}
            activeOpacity={0.8}
            onPress={() => handleConnexion()}>
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
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    width: '90%',
    borderRadius: 15,
    borderWidth: 1.5,
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1.5,
    marginBottom: 30,
    fontSize: 18
  },
  dropdownButtonStyle: {
    width: '90%',
    height: 50,
    borderWidth: 1.3,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 12
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#57606f'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28
  },
  dropdownMenuStyle: {
    backgroundColor: '#eee',
    borderRadius: 8
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26'
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
