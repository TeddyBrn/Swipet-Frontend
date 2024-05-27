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
import Swiper from 'react-native-deck-swiper';
import { url } from '../data/urlData';

export default function ProfileCard({ navigation }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url.Teddy}/profils/infos/${user.token}`
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
      <View style={styles.i}>
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
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={{ uri: card.profilAnimal.photoUrl }} />
            <View style={styles.infos}>
              <Text style={styles.profileName}>
                {card.profilAnimal.name} , {card.profilAnimal.age} ans
              </Text>
              <Text style={styles.profileCity}>
                <Ionicons name="location-outline" size={22} color="#33464d" />{' '}
                {card.profilAnimal.city}
              </Text>
              <View style={styles.ratingContainer}>
                {card.avis ? (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.profileNote}>
                      {card.avis[0].note}/5
                    </Text>
                    {Array(5)
                      .fill()
                      .map((_, i) => {
                        const fullStars = Math.floor(card.avis[0].note); // Partie entière de la note
                        const fractionalStar = card.avis[0].note % 1; // Fraction de la note

                        if (i < fullStars) {
                          // Étoiles entières
                          return (
                            <Ionicons
                              key={i}
                              name="star"
                              size={23}
                              color="#ffce0c"
                            />
                          );
                        } else if (i === fullStars && fractionalStar > 0) {
                          // Étoile partielle
                          return (
                            <View
                              key={i}
                              style={{
                                position: 'relative',
                                width: 23,
                                height: 23
                              }}>
                              <Ionicons name="star" size={23} color="#444" />
                              <View
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: `${fractionalStar * 100}%`,
                                  height: '100%',
                                  overflow: 'hidden'
                                }}>
                                <Ionicons
                                  name="star"
                                  size={23}
                                  color="#ffce0c"
                                />
                              </View>
                            </View>
                          );
                        } else {
                          // Étoiles vides
                          return (
                            <Ionicons
                              key={i}
                              name="star"
                              size={23}
                              color="#444"
                            />
                          );
                        }
                      })}
                  </View>
                ) : (
                  <Text style={styles.profileNote}>Pas d'avis</Text>
                )}
              </View>
              <Text style={styles.bioLabel}>Bio</Text>
              <Text style={styles.bioText}>{card.profilAnimal.bio}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Récupère les dimensions de l'écran
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  i: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20
  },
  headerR: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  logo: {
    width: 60,
    height: 60,
    contentFit: 'contain', //"resizeMode" is deprecated, use "contentFit" instead
    marginLeft: 20,
    marginVertical: 5
  },
  iconButton: {
    marginHorizontal: 10
  },
  main: {
    height: height * 0.76,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.7,
    // Adapter la largeur à un pourcentage de la largeur de l'écran
    width: width * 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e1ede7',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 10,
    marginTop: -45
  },
  profileImage: {
    // Adapter la hauteur et la largeur à un pourcentage de la hauteur de l'écran
    width: '100%',
    height: height * 0.35,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderRadius: 3
  },
  infos: {
    width: '90%',
    marginTop: 5
  },
  profileName: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold'
  },
  profileCity: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666'
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileNote: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666',
    paddingHorizontal: 10
  },
  bioLabel: {
    fontSize: 25,
    color: '#222',
    fontFamily: 'Quicksand-Bold',
    marginTop: 20,
    marginBottom: 5
  },
  bioText: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  buttonSwipe: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.15,
    shadowRadius: 20.0,
    elevation: 40
  }
});
