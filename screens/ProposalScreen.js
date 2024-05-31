import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Proposal({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.users.value);
  const match = useSelector((state) => state.matchs.value);
  const [infosFocused, setInfosFocused] = useState(false);
  const [infos, setInfos] = useState('');
  const [price, setPrice] = useState('');

  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');

  const formatStartDate = (input) => {
    // Supprimer les caractères non numériques
    const cleaned = input.replace(/\D+/g, '');

    // Ajouter les barres obliques pour le format DD/MM/YYYY
    let formatted = cleaned;
    if (cleaned.length > 2 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4
      )}/${cleaned.slice(4, 8)}`;
    }

    setStartDate(formatted);
  };
  const formatEndDate = (input) => {
    // Supprimer les caractères non numériques
    const cleaned = input.replace(/\D+/g, '');

    // Ajouter les barres obliques pour le format DD/MM/YYYY
    let formatted = cleaned;
    if (cleaned.length > 2 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4
      )}/${cleaned.slice(4, 8)}`;
    }

    setEndDate(formatted);
  };

  console.log(user.profilAnimal)

  const handlePress = () => {
    setIsModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              <Text style={styles.topText}>Proposition</Text>
            </View>
            <View style={{ width: 80 }}></View>
          </View>
          <View style={{ paddingLeft: 25 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.titles}>PetSitter</Text>
              <Text style={styles.text}>{match.name}</Text>
            </View>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Proposition envoyée à Marie !
                  </Text>
                  <Ionicons
                    name="checkmark-done-circle"
                    size={200}
                    color="#8fd14f"/>
                    {/* <MaterialIcons name="verified" color="#8fd14f" size={200} /> */}
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(false);
                      navigation.navigate('TabNavigator', { screen: 'Swipe' });
                    }}
                    style={styles.buttonModal}>
                    <Ionicons name="home" size={35} color="#33464d" />
                    <Text style={styles.modalText}>
                      Retour à l'accueil
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.titles}>Animal à garder</Text>
              <Text style={styles.text}>Rouky</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.titles}>Dates</Text>
              <View style={styles.dateContainer}>
                <View style={styles.inputDate}>
                  <Ionicons name="calendar" size={20} color="#333" />
                  <TextInput
                    style={styles.inputText}
                    value={startDate}
                    onChangeText={formatStartDate}
                    placeholder="DD/MM/YYYY"
                    keyboardType="numeric"
                    maxLength={10}
                    placeholderTextColor="#5a7869"
                  />
                </View>
                <View style={styles.inputDate}>
                  <Ionicons name="calendar" size={20} color="#333" />
                  <TextInput
                    style={styles.inputText}
                    value={endDate}
                    onChangeText={formatEndDate}
                    placeholder="DD/MM/YYYY"
                    keyboardType="numeric"
                    maxLength={10}
                    placeholderTextColor="#5a7869"
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.titles}>Prix</Text>
              <View
                style={[
                  styles.input,
                  { paddingLeft: 5, width: '45%', marginBottom: 20 }
                ]}>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(value) => setPrice(value)}
                  value={price}
                  placeholder="Saisissez votre prix"
                  placeholderTextColor="#5a7869"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.infos}>
              <Text style={styles.titles}>Infos complémentaires</Text>
              <View
                style={[
                  styles.input,
                  { marginBottom: 60 },
                  infosFocused && styles.inputInfosFocused
                ]}>
                <TextInput
                  style={[
                    styles.inputText,
                    { paddingLeft: 5, textAlignVertical: 'top' }
                  ]}
                  onChangeText={(value) => setInfos(value)}
                  value={infos}
                  placeholder="Infos complémentaires"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={4}
                  onFocus={() => setInfosFocused(true)}
                  onBlur={() => setInfosFocused(false)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.signUpButton}
              activeOpacity={0.8}
              onPress={() => handlePress()}>
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

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

  titles: {
    fontSize: 26,
    fontFamily: 'Montserrat-SemiBold',
    color: '#33464d',
    marginBottom: 8
  },
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#5a7869'
  },

  dateContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  inputDate: {
    borderBottomWidth: 1.5,
    width: '43%',
    padding: 8,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#33464d'
  },
  input: {
    borderRadius: 5,
    borderBottomWidth: 1.5,
    width: '80%',
    padding: 10,
    marginVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#33464d'
  },
  inputInfosFocused: {
    borderColor: '#33464d',
    borderWidth: 1,
    borderBottomWidth: 2
  },
  inputText: {
    fontSize: 18,
    paddingLeft: 10,   
    color: '#5a7869'
  },
  signUpButton: {
    backgroundColor: '#5a7869',
    borderColor: '#33464d',
    width: '55%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1.5
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    fontFamily: 'Montserrat-Bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    height: height * 0.6,
    width: width * 0.9,
    flexDirection: 'column'
  },
  modalInfosContainer: {
    width: width * 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    height: height * 0.5
  },
  modalTitle: {
    fontSize: 40,
    color: '#72e2ba',
    fontFamily: 'PoetsenOne-Regular',
    paddingVertical: 20,
    textAlign: 'center'
  },
  buttonModal: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#33464d',
    padding: 10,
    marginTop: 50
  },
  modalText: {
    fontSize: 20,
    color: '#33464d',
    fontFamily: 'Montserrat-Bold',
    paddingVertical: 10,
    textAlign: 'center',
    paddingLeft: 10
  }
});
