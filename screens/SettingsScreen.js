import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/users';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
 console.log(`user.token => ${user.token}`)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={60} color="#33464d" />
        </TouchableOpacity>
        <View style={styles.topMid}>
          <Text style={styles.topText}>Paramètres</Text>
        </View>
        <View style={{ width: 60 }}></View>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profil',)}>
            <Text style={styles.buttonText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfilAnimal',{test:'bonjour'})}>
            <Text style={styles.buttonText}>Profil Animal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Historique')}>
            <Text style={styles.buttonText}>Historique</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Payment')}>
            <Text style={styles.buttonText}>Moyen De Paiement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Avis')}>
            <Text style={styles.buttonText}>Avis</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.littleBtnContainer}>
          <TouchableOpacity style={[styles.button, styles.viewButton]}
          onPress={() => navigation.navigate('MyProfil')}>
            <Text style={[styles.buttonText, styles.color]}>Voir Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={() =>  {dispatch(logout()); navigation.navigate('Home')} }>
            <Text style={[styles.buttonText, styles.color]}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff60'
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
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
  topMid: {
    alignItems: 'center'
  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  btnContainer: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center'
  },
  littleBtnContainer: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#33464d',
    width: '70%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 2
  },
  buttonText: {
    color: '#33464d',
    fontSize: 25,
    fontFamily: 'Montserrat-Bold'
  },
  viewButton: {
    backgroundColor: '#5a7869',
    width: '50%'
  },
  logoutButton: {
    width: '50%',
    backgroundColor: '#FF6666',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  color: {
    color: 'white'
  },
});



