import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        

      <Text style={styles.title}>Paramètres</Text>
      <View style={styles.logoContainer}>
        
        
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Profil Animal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Historique</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Moyen De Paiement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Avis</Text>
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

});

export default SettingsScreen;


/*
    <Image source={require('../assets/logo.jpg')} style={styles.logoImage} />
*/