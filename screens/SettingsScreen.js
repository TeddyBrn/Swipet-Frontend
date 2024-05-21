import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.jpg')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.title}>Paramètres</Text>
      <View style={styles.logoContainer}>
        
        
      </View>
      <TouchableOpacity 
      style={styles.button}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProfilAnimal')}>
        <Text style={styles.buttonText}>Profil Animal</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.button}
      activeOpacity={0.8}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.buttonText}>Profil</Text>
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
      <TouchableOpacity style={styles.viewProfileButton}>
        <Text style={styles.viewProfileButtonText}>Voir Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 50,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

    
  },
  logoImage: {
    width: 40,
    height: 40,
    //  position: 'absolute',
    marginLeft: 290,
    marginTop: 0,
    borderColor: 'red',
    borderWidth: 1,
    
  },
  button: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  viewProfileButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  viewProfileButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  logoutButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FF6666',
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default SettingsScreen;


/*
    <Image source={require('../assets/logo.jpg')} style={styles.logoImage} />
*/