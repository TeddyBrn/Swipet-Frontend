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
import { useDispatch, useSelector } from 'react-redux';
import { addDistance } from '../reducers/filters';
import { addAgeMin } from '../reducers/filters';
import { addAgeMax } from '../reducers/filters';
import { addTime } from '../reducers/filters';
import { addNoteMin } from '../reducers/filters';








const ageData = [
  { label: '18 ans', value: 18 },
  { label: '25 ans', value: 25 },
  { label: '35 ans', value: 35 },
  { label: '45 ans', value: 45 },
  { label: '55 ans', value: 55 },
  { label: '65 ans', value: 65 },
  { label: '75 ans', value: 75 },
  { label: '85 ans', value: 85 },
  { label: '95 ans', value: 95 }
];

const durationData = [
  { label: "moins d'une semaine", value: 1 },
  { label: 'une à deux semaines', value: 2 },
  { label: 'deux à trois semaines', value: 3 },
  { label: 'plus de trois semaines', value: 4 }
];

const FiltersScreen = ({ navigation }) => {
  const [kmValue, setKmValue] = useState(2);
  const [ageMinValue, setAgeMinValue] = useState(null);
  const [ageMaxValue, setAgeMaxValue] = useState(null);
  const [averageNote, setAverageNote] = useState(0);
  const [durationValue, setDurationValue] = useState(null);

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.value);

  const handleValidate = () => {
    dispatch(addDistance(kmValue));
    dispatch(addAgeMin(ageMinValue));
    dispatch(addAgeMax(ageMaxValue));
    dispatch(addNoteMin(averageNote));
    dispatch(addTime(durationValue));
    console.log(`handle validate click`);
    navigation.navigate("Swipe")
  }

  console.log(`filter distance => ${filter.distance}`);
  console.log(`filter tranche d'age => ${filter.ageMin} - ${filter.ageMax}`);
  console.log(`filter averageNote => ${filter.noteMin}`);
  console.log(`filter durée => ${filter.time}`);

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
        size={23}
        color={style.color}
        onPress={() => setAverageNote(i + 1)}
        style={style}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Filtres</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choisissez vos préférences</Text>
        </View>

        <View style={styles.filterContainer}>
          <View style={[styles.individualContainer, { paddingLeft: 20 }]}>
            <Text style={styles.titleFilter}>Distance</Text>
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
            <View style={styles.sliderValueContainer}>
              <Text style={styles.sliderValue}>{kmValue} Km</Text>
            </View>
          </View>

          <View
            style={[
              styles.individualContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'space-around'
              }
            ]}>
            <View style={styles.ageContainer}>
              <Text style={styles.titleFilter}>Age </Text>
              <Dropdown
                style={styles.dropdown}
                data={ageData}
                labelField="label"
                valueField="value"
                value={ageMinValue}
                onChange={(item) => setAgeMinValue(item.value)}
                placeholder="Age Min"
                selectedTextStyle={styles.selectedTextStyle}
              />
            </View>
            <View style={styles.ageContainer}>
              <Dropdown
                style={styles.dropdown}
                data={ageData}
                labelField="label"
                valueField="value"
                value={ageMaxValue}
                onChange={(item) => setAgeMaxValue(item.value)}
                placeholder="Age Max"
                selectedTextStyle={styles.selectedTextStyle}
              />
            </View>
          </View>

          <View style={[styles.individualContainer, { paddingLeft: 20 }]}>
            <Text style={styles.titleFilter}>Note Minimum</Text>
            <Text style={{ marginVertical: 10 }}>{stars}</Text>
          </View>

          <View style={[styles.individualContainer, { paddingLeft: 20 }]}>
            <Text style={styles.titleFilter}>Durée</Text>
            <Dropdown
              style={styles.dropdown}
              data={durationData}
              labelField="label"
              valueField="value"
              value={durationValue}
              onChange={(item) => setDurationValue(item.value)}
              placeholder="Sélectionnez une durée"
              activeColor="#5a7869"
              selectedTextStyle={styles.selectedTextStyle}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => handleValidate()}
          >
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
    // backgroundColor: '#fff'
    backgroundColor: '#ffffff60'

  },
  topContainer: {
    width: '100%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
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
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8%',
    // backgroundColor: '#efefef60'
  },
  title: {
    fontSize: 23,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  titleFilter: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  filterContainer: {
    width: '100%',
    height: '74%',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'scroll',
    // backgroundColor: '#efefef60'
  },
  individualContainer: {
    width: '85%',
    borderColor: '#33464d',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 10
  },
  sliderValueContainer: {
    width: '26%',
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  sliderValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  slider: {
    width: '90%',
    height: 40
  },
  ageContainer: {
    width: '40%'
  },
  dropdown: {
    width: '90%',
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#33464d'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    // backgroundColor: '#efefef60'

  },
  button: {
    backgroundColor: '#5a7869',
    borderColor: '#33464d',
    width: '55%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1.5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Montserrat-Bold'
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
