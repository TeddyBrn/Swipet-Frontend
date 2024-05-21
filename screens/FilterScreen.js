import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ageData = [
  { label: '18 ans', value: 1 },
  { label: '25 ans', value: 2 },
  { label: '35 ans', value: 3 },
  { label: '45 ans', value: 4 },
];

const FiltersScreen = ({ navigation }) => {
  const [kmValue, setKmValue] = useState(2);
  const [ageValue, setAgeValue] = useState(null);
  const [averageNote, setAverageNote] = useState(0);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = { 'cursor': 'pointer' };
    if (i < averageNote) {
      style = { 'color': '#2196f3', 'cursor': 'pointer' };
    }
    stars.push(<Ionicons key={i} name="star" size={26} color={style.color} onPress={() => setAverageNote(i + 1)} style={style} />);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtres</Text>
      <Text style={styles.text}>Choisissez vos préférences</Text>
      <View style={styles.optionsContainer}>
        <Text style={styles.sliderValue}>Distance: moins de {kmValue} Km</Text>
        <Slider 
          style={styles.slider}
          minimumValue={2}
          maximumValue={30}
          step={2}
          value={kmValue}
          onValueChange={setKmValue}
          minimumTrackTintColor="#2196f3"
          maximumTrackTintColor="#222222"
          thumbTintColor="#2196f3"
        />
        <Text style={styles.sliderValue}>Age minimum:</Text>
        <Dropdown
          style={styles.dropdown}
          data={ageData}
          labelField="label"
          valueField="value"
          value={ageValue}
          onChange={item => setAgeValue(item.value)}
          placeholder="Age min"
        />
        <Text style={styles.sliderValue}>Note minimum:</Text>
        <Text>{stars}</Text>
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
    borderWidth: 1.5,
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
    overflow: 'scroll',
  },
  sliderValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  dropdown: {
    width: '90%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default FiltersScreen;

/*
structure personalnote de mymoviz
function Movie(props) {
 const [personalNote, setPersonalNote] = useState(0);


   const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { 'cursor': 'pointer' };
    if (i < personalNote) {
      style = { 'color': '#2196f3', 'cursor': 'pointer' };
    }
    personalStars.push(<FontAwesomeIcon key={i} icon={faStar} onClick={() => setPersonalNote(i + 1)} style={style} className="note" />);
  }

  return (
    <span>{personalStars} ({personalNote})</span>
      );
}



Doc de Slider : https://www.npmjs.com/package/@react-native-community/slider
 Doc de Dropdown : https://www.npmjs.com/package/react-native-element-dropdown
*/