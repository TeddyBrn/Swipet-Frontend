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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addAnimal, login } from '../reducers/users';




export default function ProfilAnimalScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(user)

    const [name, setName] = useState(user.profilAnimal.name);
    const [detail, setDetail] = useState(user.profilAnimal.detail);
    const [type, setType] = useState('');
    const [genre, setGenre] = useState('');
    const [bio, setBio] = useState(user.profilAnimal.bio);



  const gender = ['Male', 'Female', 'Non Binaire'];
  const typeAnimal = ['chien', 'chat'];

  const handleChange = () => {

    fetch(`http://192.168.233.47:3000/settings/editanimal/${user.token}/${user.profilAnimal._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        bio: bio,
        detail: detail,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.result &&
          dispatch(login({ name, bio, detail }));
            setName(name); setDetail(detail); setBio(bio);
        })
     }

    const handleBackPress = () => {
        navigation.goBack();
    };

    // return (
    //     <SafeAreaView style={styles.container}>
    //     <KeyboardAvoidingView
    //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    //         <View style={styles.topContainer}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <Ionicons name="arrow-back" size={60} color="#E06359" />
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}>
            <Ionicons name="chevron-back" size={60} color="#33464d" />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Profil Animal</Text>
          </View>
          <View style={{ width: 80 }}></View>
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
                <TextInput
                    style={styles.inputBio}
                    onChangeText={(value) => setBio(value)}
                    value={bio}
                    placeholder="Bio de l'animal"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}
                    onPress={() => handleChange()}
                >
                    <Text style={styles.connexionButtonText}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
  //     </KeyboardAvoidingView>
  //   </SafeAreaView>
  // );
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
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20,
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
  }
});
