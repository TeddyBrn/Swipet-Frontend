import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../reducers/users';
import { addMatch } from '../reducers/matchs';
import Swiper from 'react-native-deck-swiper';
import { BACKEND_ADRESS } from '../data/urlData';

export default function ProfileCard({ navigation }) {
  const [profilsData, setProfilsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const filter = useSelector((state) => state.filters.value);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user.role)
      try {
        const response = await fetch(
          `${BACKEND_ADRESS}/profils/swipe/${user.role}`          
        );
        const data = await response.json();
        if (data.result) {
          setProfilsData(data.data);
          const dataFiltered = data.data.filter(
            (profil) =>
              profil.age >= filter.ageMin &&
              profil.age <= filter.ageMax &&
              (!profil.avis[0] || profil.avis[0].note >= filter.noteMin)
          );

          setProfilsData(dataFiltered);
        } else {
          setError('Failed to fetch profiles');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };
    // console.log(`user.token => ${user.token}`);
    fetchData();
  }, [filter.noteMin, filter.ageMax, filter.ageMin]);

  const addAlike = () => {
    dispatch(addLike(profilsData[count]._id));
    fetch(
      `${BACKEND_ADRESS}/matchs/like/${user.token}/${profilsData[count]._id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'new match created!') {
          dispatch(
            addMatch({ token: user.token, _id: profilsData[count]._id })
          );
          setIsModalVisible(true);
        }
      });
  };

  const [count, setCount] = useState(0);

  const handleLike = () => {
    setCount(count + 1);
    addAlike();
  };

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
              <Ionicons name="settings" size={35} color="#33464d" />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalInfosContainer}>
                <Text style={styles.modalTitle}>Nouveau match !</Text>
                <Text style={styles.infosMatch}>
                  {isModalVisible &&
                    `Vous et ${profilsData[count - 1].firstname} avez un match`}
                </Text>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.infosImage}
                    source={{ uri: user.photo }}
                  />
                  {isModalVisible && (
                    <Image
                      style={styles.infosImage}
                      source={{ uri: profilsData[count - 1].photo }}
                    />
                  )}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    navigation.navigate('TabNavigator', { screen: 'Messages' });
                  }}
                  style={styles.button}>
                  <Ionicons name="chatbubbles" size={30} color="#333" />
                  <Text style={styles.buttonText}>Envoyer un message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.button}>
                  <Ionicons name="arrow-undo" size={30} color="#333" />
                  <Text style={styles.buttonText}>Continuer à Swipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.main}>
          {profilsData.length ? (
            <Swiper
              cards={profilsData} // Les données des profils à swiper
              ref={swiperRef}
              renderCard={(card) => {
                
                return (
                  <View style={styles.profileContainer}>
                    <Image
                      style={styles.profileImage}
                      source={{ uri: card.photo }}/>
                    <View style={styles.infos}>
                      <Text style={styles.profileName}>
                        {card.firstname} , {card.age} ans
                      </Text>
                      <Text style={styles.profileCity}>
                        <Ionicons
                          name="location-outline"
                          size={18}
                          color="#33464d"
                        />{' '}
                        {card.city}
                      </Text>
                     { card.avis[0] && <View style={styles.ratingContainer}>
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
                                    size={18}
                                    color="#ffce0c"
                                  />
                                );
                              } else if (
                                i === fullStars &&
                                fractionalStar > 0
                              ) {
                                // Étoile partielle
                                return (
                                  <View
                                    key={i}
                                    style={{
                                      position: 'relative',
                                      width: 18,
                                      height: 18
                                    }}>
                                    <Ionicons
                                      name="star"
                                      size={18}
                                      color="#444"
                                    />
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
                                        size={18}
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
                                    size={18}
                                    color="#444"
                                  />
                                );
                              }
                            })}
                        </View>
                      </View>}
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
              stackSize={3} // Nombre de cartes empilées en arrière-plan
              stackScale={3}
              stackSeparation={16}
            />
          ) : (
            <Text style={styles.notFound}>aucun profil trouvé</Text>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.buttonSwipe}
            activeOpacity={0.7}
            onPress={handleSwipeLeft}>
            <Ionicons name="close-outline" size={55} color="#f74c4f" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSwipe}
            activeOpacity={0.7}
            onPress={handleSwipeRight}>
            <Ionicons name="heart" size={40} color="#8ad1ad" />
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
    height: height * 0.71,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.64,
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
    height: height * 0.3,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderRadius: 3
  },
  infos: {
    width: '90%',
    marginTop: 5
  },
  profileName: {
    fontSize: 26,
    fontFamily: 'Quicksand-Bold'
  },
  profileCity: {
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666'
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileNote: {
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666',
    paddingHorizontal: 10
  },
  bioLabel: {
    fontSize: 22,
    color: '#222',
    fontFamily: 'Quicksand-Bold',
    marginTop: 20,
    marginBottom: 5
  },
  bioText: {
    fontSize: 18,
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
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.15,
    shadowRadius: 20.0,
    elevation: 40
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'flex-start',
    height: height * 0.6,
    width: width * 0.9,
    flexDirection: 'column'
  },
  modalInfosContainer: {
    width: width * 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    height: height * 0.5
  },
  modalTitle: {
    fontSize: 40,
    color: '#72e2ba',
    fontFamily: 'PoetsenOne-Regular',
    paddingVertical: 20
  },
  infosMatch: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'PoetsenOne-Regular',
    paddingVertical: 10
  },
  imageContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    width: width * 0.8,
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  infosImage: {
    width: 120,
    height: 120,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: '#333'
  },
  buttonContainer: {
    width: width * 0.7,
    margin: -100,
    alignItems: 'center'
  },
  button: {
    height: height * 0.07,
    width: width * 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#333'
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666',
    marginTop: 150
  }
});
