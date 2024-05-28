import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import MasterCard from '../components/masterCard';
import PetsitterCard from '../components/petsitterCard';
import { BACKEND_ADRESS } from '../data/urlData';

export default function MyProfil({ navigation }) {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_ADRESS}/profils/infos/${user.token}`
        );
        const data = await response.json();
        if (data.result) {
          setCard(data.data);
          
        } else {
          setError('Failed to fetch profiles');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(card)
  let cardProfil = null
    if (user.role === 'faire garder') {
      cardProfil = <MasterCard  props={card} />
    } else if (user.role === 'garder') {
      cardProfil = <PetsitterCard  props={card} />
    }


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={60} color="#33464d" />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Mon Profil</Text>
          </View>
          <View style={{ width: 60 }}></View>
        </View>
        <View style={styles.main}>
          {cardProfil}
        </View>
   
    </SafeAreaView>
  );
}

// Récupère les dimensions de l'écran
const { width, height } = Dimensions.get('window');

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
  main: {
    height: height * 0.76,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

});
