import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={60} color="#33464d" />
        </TouchableOpacity>
        <View style={styles.topMid}>
          <Text style={styles.topText}>Paramètres</Text>
        </View>
        <View style={{width: 60}}></View>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProfilAnimal')}>
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
      <TouchableOpacity style={[styles.button, styles.viewButton]}>
        <Text style={[styles.buttonText, styles.color]}>Voir Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
  topMid: {
    alignItems: 'center'
  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  button: {
    backgroundColor: '#fff',
    borderColor: "#33464d", 
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
    width: '50%',
  },
  color: {
    color: 'white',
  },
  logoutButton: {
    width: '50%',
    backgroundColor: '#FF6666',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 220
  },
  logoutButtonText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#FFF'
  }
});

export default SettingsScreen;
