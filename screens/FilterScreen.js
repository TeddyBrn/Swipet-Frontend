import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FiltersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        

      <Text style={styles.title}>Filtres</Text>

      
        <Text style={styles.text}>Choisissez vos préférences</Text>
      


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

});

export default FiltersScreen;


