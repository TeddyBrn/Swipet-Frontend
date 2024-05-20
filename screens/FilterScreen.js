import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image , } from 'react-native';
import Slider from '@react-native-community/slider';

const FiltersScreen = ({ navigation }) => {
  const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
        

      <Text style={styles.title}>Filtres</Text>

      
        <Text style={styles.text}>Choisissez vos préférences</Text>
        <View style={styles.optionsContainer}>
        <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={20}
        step={2}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1fb28a"
      />

        </View>

        <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Valider</Text>
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

  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#8FD14F', 
    width: '45%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 100,
    borderWidth: 1.5
  },
  optionsContainer: {
    backgroundColor: 'white', 
    width: '90%',
    height: '55%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: 'black',
    overflow: 'scroll'

  },
  slider: {
    width: '100%',
    height: 40,
  },

});

export default FiltersScreen;


/*
    <View style={styles.optionsContainer}>
        

    </View>

    optionsContainer: {
    backgroundColor: 'white', 
    width: '90%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1.5
    borderColor: 'black',

  },
*/