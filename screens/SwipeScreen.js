import React, { useState,  useRef, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../reducers/users';
import Swiper from 'react-native-deck-swiper';
import { profilData } from '../data/profils';

export default function ProfileCard({ navigation }) {
  const [profilsData, setProfilsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.40:3000/profils/petsitters');
        const data = await response.json();
        if (data.result) {
          setProfilsData(data.data);
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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(`user.token => ${user.token}`);

  const addAlike = () => dispatch(addLike(profilsData[count]._id));

  const [count, setCount] = useState(0);

  const handleLike = () => {
    setCount(count + 1);
    addAlike();
  };
  console.log(`user.like => ${user.like}`);

  const handleDislike = () => {
    setCount(count + 1);
  };

  const swiperRef = useRef(null);

  const handleSwipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
  };

  const handleSwipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
  };

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
        <View style={styles.header}>
          <Image
            source={require('../assets/miniLogo.png')}
            style={styles.logo}
          />
          <View style={styles.headerR}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications" size={35} color="#33464d" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings-outline" size={35} color="#33464d" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          <Swiper
            cards={profilsData} // Les données des profils à swiper
            ref={swiperRef}
            renderCard={(card) => {
              return (
                <View style={styles.profileContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{ uri: card.url }}
                  />
                  <View style={styles.infos}>
                    <Text style={styles.profileName}>
                      {card.firstname} , {card.age} ans
                    </Text>
                    <Text style={styles.profileCity}> {card.city}</Text>
                    <View style={styles.ratingContainer}>
                      
                      <View style={styles.ratingContainer}>
                        <Text style={styles.profileNote}>
                          {card.avis[0].note}/5
                        </Text>
                        {Array(5)
                          .fill()
                          .map((_, i) =>
                            i < Math.round(card.avis[0].note) ? (
                              <Ionicons
                                key={i}
                                name="star"
                                size={23}
                                color="#ffce0c"
                              />
                            ) : (
                              <Ionicons
                                key={i}
                                name="star"
                                size={23}
                                color="#444"
                              />
                            )
                          )}
                      </View>
                    </View>
                    <Text style={styles.bioLabel}>Bio</Text>
                    <Text style={styles.bioText}>{card.bio}</Text>
                  </View>
                </View>
              );
            }}
            verticalSwipe={false}
            onSwipedLeft={handleDislike}
            onSwipedRight={handleLike}
            cardIndex={count} // index du profil actuellement visible
            backgroundColor={'transparent'}
            stackSize={4} // Nombre de cartes empilées en arrière-plan
            stackScale={3}
            stackSeparation={16}
          />
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.buttonSwipe}
            activeOpacity={0.7}
            onPress={handleSwipeLeft}>
            <Ionicons name="close-outline" size={65} color="#f74c4f" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSwipe}
            activeOpacity={0.7}
            onPress={handleSwipeRight}>
            <Ionicons name="heart" size={50} color="#8ad1ad" />
          </TouchableOpacity>
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
    height: height * 0.75,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',

  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.68,
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
