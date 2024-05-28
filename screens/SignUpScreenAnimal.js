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
  Pressable,
  ScrollView
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addAnimal, login } from '../reducers/users';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { BACKEND_ADRESS } from '../data/urlData';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function SignUpScreenAnimal({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(user);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [detail, setDetail] = useState('');
  const [gender, setGender] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [image, setImage] = useState('');

  const [bioFocused, setBioFocused] = useState(false);
  const [detailFocused, setDetailFocused] = useState(false);

  const dataGender = ['Male', 'Female'];
  const dataAnimalType = ['Chien', 'Chat', 'Lapin'];

  // ImagePicker

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // DatePicker

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date) => {
  //   console.warn(date);
  //   setBirthDate(date);
  //   hideDatePicker();
  // };

  // const handleAddAnimal = () => {
  //   fetch(`http://192.168.233.47:3000/profils/signup/animal/${user.token}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, year, animalType, gender, bio, detail })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.result &&
  //         dispatch(
  //           addAnimal({
  //             token: data.token,
  //             name,
  //             age,
  //             animalType,
  //             gender,
  //             bio,
  //             detail
  //           })
  //         );
  //       setName('');
  //       setYear('');
  //       setBio('');
  //     });
  // };

  const handleConnexion = () => {
    if (!image) {
      setFieldError(true);
      return;
    }
    const formData = new FormData();

    formData.append('photoUrl', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg'
    });
    formData.append('name', name);
    formData.append('animalType', animalType);
    formData.append('gender', gender);
    formData.append('bio', bio);
    formData.append('detail', detail);
    formData.append('age', age);

    if (!image) {
      fetch(`${BACKEND_ADRESS}/animals/addanimal/${user.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          animalType,
          gender,
          bio,
          detail,
          age
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            dispatch(
              addAnimal({
                name,
                age,
                animalType,
                gender,
                bio,
                detail,
                photo: data.newDoc.photo
              })
            );

            navigation.navigate('TabNavigator');
          }
        });
    } else {
      fetch(`${BACKEND_ADRESS}/animals/addanimal/${user.token}`, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.result && dispatch(addAnimal({ token: data.newDoc.token }));
          navigation.navigate('TabNavigator');
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={60} color="#33464d" />
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
            <TouchableOpacity
              style={styles.imagePicker}
              activeOpacity={0.8}
              onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image
                  source={require('../assets/add-image.png')}
                  style={{ width: 60, height: 60, color: '#33464d' }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.inputContain}>
              <View style={styles.input}>
                <Ionicons name="person" size={20} color="#33464d" />
                <TextInput
                  style={styles.inputText}
                  onChangeText={(value) => setName(value)}
                  value={name}
                  placeholder="Nom"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.input}>
                <Ionicons name="calendar" size={20} color="#33464d" />
                <TextInput
                  style={styles.inputText}
                  onChangeText={(value) => setAge(value)}
                  value={age}
                  placeholder="Age"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View
                style={[styles.input, bioFocused && styles.inputBioFocused]}>
                <TextInput
                  style={[
                    styles.inputText,
                    { paddingLeft: 0 },
                    { textAlignVertical: 'top' }
                  ]}
                  onChangeText={(value) => setBio(value)}
                  value={bio}
                  placeholder="Bio"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={2}
                  onFocus={() => setBioFocused(true)}
                  onBlur={() => setBioFocused(false)}
                />
              </View>
              <View
                style={[
                  styles.input,
                  detailFocused && styles.inputDetailFocused
                ]}>
                <TextInput
                  style={[
                    styles.inputText,
                    { paddingLeft: 0 },
                    { textAlignVertical: 'top' }
                  ]}
                  onChangeText={(value) => setDetail(value)}
                  value={detail}
                  placeholder="Detail sur la garde"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={2}
                  onFocus={() => setDetailFocused(true)}
                  onBlur={() => setDetailFocused(false)}
                />
              </View>
              <SelectDropdown
                data={dataGender}
                onSelect={(selectedItem) => {
                  setGender(selectedItem);
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
                data={dataAnimalType}
                onSelect={(selectedItem) => {
                  setAnimalType(selectedItem);
                  console.log(selectedItem);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem) ||
                          'Type : chien, chat ...'}
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
              {fieldError && (
                <Text style={styles.error}>Missing or empty fields.</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.signUpButton}
              activeOpacity={0.8}
              // onPress={() => navigation.navigate("TabNavigator")}
              onPress={() => handleConnexion()}>
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: 'contain'
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
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    borderRadius: 5,
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
    color: '#5a7869',
    width: '90%'
  },
  dropdownButtonStyle: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1.3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#33464d'
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#5a7869'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: '#33464d'
  },
  dropdownMenuStyle: {
    backgroundColor: '#e0dfe2',
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
    backgroundColor: '#5a7869',
    borderColor: '#33464d',
    width: '55%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 70,
    borderWidth: 1.5
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    fontFamily: 'Montserrat-Bold'
  },
  inputBioFocused: {
    borderColor: '#33464d',
    borderWidth: 1,
    borderBottomWidth: 1.5
  },
  inputDetailFocused: {
    borderColor: '#33464d',
    borderWidth: 1,
    borderBottomWidth: 1.5
  },
  error: {
    color: '#e23636',
    fontSize: 16
  }
});
