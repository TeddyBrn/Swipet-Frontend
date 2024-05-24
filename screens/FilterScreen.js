import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profilData } from '../data/profils';


// fonctionnalité de filtre en cours...
export let newArray = (profilData, ageValue, averageNote) => {
  let profilDataFilter = [];

  for (let i = 0; i < profilData.length; i++) {
    if (profilData[i].age <= ageValue && profilData[i].avis[0].note >= averageNote) {
      profilDataFilter.push(profilData[i]);
    }
  }

  return profilDataFilter;
};



const ageData = [
  { label: '18 ans', value: 1 },
  { label: '25 ans', value: 2 },
  { label: '35 ans', value: 3 },
  { label: '45 ans', value: 4 }
];

const durationData = [
  { label: "moins d'une semaine", value: 1 },
  { label: 'une semaine à deux semaines', value: 2 },
  { label: 'deux à trois semaines', value: 3 },
  { label: 'plus de trois semaines', value: 4 }
];

const FiltersScreen = ({ navigation }) => {
  const [kmValue, setKmValue] = useState(2);
  const [ageValue, setAgeValue] = useState(null);
  const [averageNote, setAverageNote] = useState(0);
  const [durationValue, setDurationValue] = useState(null);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = { cursor: 'pointer' };
    if (i < averageNote) {
      style = { color: '#5a7869' };
    }
    stars.push(
      <Ionicons
        key={i}
        name="star"
        size={26}
        color={style.color}
        onPress={() => setAverageNote(i + 1)}
        style={style}
      />
    );
  }
  // const handleValidate = () => {
  //   const filteredProfiles = newArray(profilData, ageValue, averageNote);
  //   console.log(filteredProfiles); 
  // };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>

          <View style={styles.topMid}>
            <Text style={styles.topText}>Filtres</Text>
          </View>

        </View>

        <Text style={styles.text}>Choisissez vos préférences</Text>
        <View style={styles.optionsContainer}>
          <Text style={styles.sliderValue}>
            Distance: moins de {kmValue} Km
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={2}
            maximumValue={30}
            step={2}
            value={kmValue}
            onValueChange={setKmValue}
            minimumTrackTintColor="#5a7869"
            maximumTrackTintColor="#222222"
            thumbTintColor="#5a7869"
          />
          <Text style={styles.sliderValue}>Age minimum:</Text>
          <Dropdown
            style={styles.dropdown}
            data={ageData}
            labelField="label"
            valueField="value"
            value={ageValue}
            onChange={(item) => setAgeValue(item.value)}
            placeholder="rechercher un age minimum"
            activeColor="#5a7869"
            selectedTextStyle={styles.selectedTextStyle}
          />
          <Text style={styles.sliderValue}>Note minimum:</Text>
          <Text style={styles.stars}>{stars}</Text>
          <Text style={styles.sliderValue}>Durée:</Text>
          <Dropdown
            style={styles.dropdown}
            data={durationData}
            labelField="label"
            valueField="value"
            value={durationValue}
            onChange={(item) => setDurationValue(item.value)}
            placeholder="rechercher une durée"
            activeColor="#5a7869"
            selectedTextStyle={styles.selectedTextStyle}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} >
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  topContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
  topMid: {
    alignItems: 'center'

  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 45
  },
  button: {
    backgroundColor: '#5a7869',
    borderColor: "#33464d",
    width: '55%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 70,
    borderWidth: 1.5
  },
  optionsContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '55%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#33464d',
    overflow: 'scroll',
    marginLeft: 20,
  },
  sliderValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  slider: {
    width: '100%',
    height: 40
  },
  dropdown: {
    width: '90%',
    marginBottom: 20
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#5a7869',
    fontWeight: 'bold'
  },
  stars: {
    marginBottom: 15
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 18,
    color: '#FFF'
  }
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

  renderRightIcon={() => (
            <Ionicon
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="chevron-down-outline"
              size={20}
            />
          )}
*/
