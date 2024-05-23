import React, { useState, useEffect } from 'react';
import { View, Text,  TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../reducers/users';
import { profilData } from '../data/profils';
import Swiper from 'react-native-deck-swiper';  

export default function ProfileCard({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(`user.token => ${user.token}`);
  const addAlike = () => dispatch(addLike(profilData[count]._id));

  const [count, setCount] = useState(0);
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [bio, setBio] = useState('');
//   const [img, setImg] = useState('');
//   const [note, setNote] = useState(0);
//   console.log(img)

//   useEffect(() => {
//     setName(profilData[0].firstname);
//     setAge(profilData[0].age);
//     setBio(profilData[0].bio);
//     setImg(profilData[0].url);
//     setNote(profilData[0].avis[0].note);
//   }, []);

  const handleLike = () => {
     setCount(count + 1);
    // setName(profilData[count].firstname);
    // setAge(profilData[count].age);
    // setBio(profilData[count].bio);
    // setImg(profilData[count].url);
    // setNote(profilData[count].avis[0].note);
    addAlike();
  };
  console.log(`user.like => ${user.like}`);
  const handleDislike = () => {
    setCount(count + 1);
    // setName(profilData[count].firstname);
    // setAge(profilData[count].age);
    // setBio(profilData[count].bio);
    // setImg(profilData[count].url);
    // setNote(profilData[count].avis[0].note);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/miniLogo.png')} style={styles.logo} />
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
          cards={profilData}  // Les données des profils à swiper
          renderCard={(card) => {
            return (
              <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={{ uri: card.url }} />
                <View style={styles.ratingContainer}>
                  <Text style={styles.profileNote}>{card.avis[0].note}/5</Text>
                  {Array(Math.round(card.avis[0].note))
                    .fill()
                    .map((_, i) => (
                      <Image key={i} source={require('../assets/star.png')} style={styles.star} />
                    ))}
                </View>
                <View style={styles.infos}>
                  <Text style={styles.profileName}>
                    {card.firstname} , {card.age} ans
                  </Text>
                  <Text style={styles.bioLabel}>Bio</Text>
                  <Text style={styles.bioText}>{card.bio}</Text>
                </View>
              </View>
            );
          }}
          verticalSwipe={false}
          onSwipedLeft={handleDislike}  
          onSwipedRight={handleLike}  
          cardIndex={count}  // index du profil actuellement visible
          backgroundColor={'#ffffff'}  
          stackSize={4}  // Nombre de cartes empilées en arrière-plan
        />

      </View>
    </SafeAreaView>
  );
}

// Récupère les dimensions de l'écran
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20,
  },
  headerR: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 20,
    marginVertical: 5,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  main: {
    width: '100%',
    height: '91%',
    alignItems: 'center',
    justifyContent:"space-around"
  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.70,
    // Adapter la largeur à un pourcentage de la largeur de l'écran
    width: width * 0.93,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 15,
    paddingTop: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 10,
  },
  profileImage: {
    // Adapter la hauteur et la largeur à un pourcentage de la hauteur de l'écran
    width: width * 0.95,
    height: height * 0.4,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    width: '90%',
  },
  star: {
    width: 30,
    height: 30,
    marginHorizontal: 1,
  },
  infos: {
    width: '89%',
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
    borderTopColor: 'gray',
    borderTopWidth: 1.5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1.5,
    paddingLeft: 10,
  },
  profileNote: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bioLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 15,
  },
  bioText: {
    fontSize: 18,
    width: '90%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  buttonSwipe: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent:"center",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20.0,
    elevation: 40,
  },
});


/*
code précédent

import React, { useState, useEffect } from 'react';
import { View, Text,  TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../reducers/users';
import { profilData } from '../data/profils';

export default function ProfileCard({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(`user.token => ${user.token}`);
  const addAlike = () => dispatch(addLike(profilData[count]._id));

  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const [note, setNote] = useState(0);
  console.log(img)

  useEffect(() => {
    setName(profilData[0].firstname);
    setAge(profilData[0].age);
    setBio(profilData[0].bio);
    setImg(profilData[0].url);
    setNote(profilData[0].avis[0].note);
  }, []);

  const handleLike = () => {
    setCount(count + 1);
    setName(profilData[count].firstname);
    setAge(profilData[count].age);
    setBio(profilData[count].bio);
    setImg(profilData[count].url);
    setNote(profilData[count].avis[0].note);
    addAlike();
  };
  console.log(`user.like => ${user.like}`);
  const handleDislike = () => {
    setCount(count + 1);
    setName(profilData[count].firstname);
    setAge(profilData[count].age);
    setBio(profilData[count].bio);
    setImg(profilData[count].url);
    setNote(profilData[count].avis[0].note);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/miniLogo.png')} style={styles.logo} />
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
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={img}  />
          <View style={styles.ratingContainer}>
            <Text style={styles.profileNote}>{note}/5</Text>
            {Array(Math.round(note))
              .fill()
              .map((_, i) => (
                <Image key={i} source={require('../assets/star.png')} style={styles.star} />
              ))}
          </View>
          <View style={styles.infos}>
            <Text style={styles.profileName}>
              {name} , {age} ans
            </Text>
            <Text style={styles.bioLabel}>Bio</Text>
            <Text style={styles.bioText}>{bio}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          
          <TouchableOpacity style={styles.buttonSwipe} activeOpacity={0.7} onPress={handleDislike}>
            <Ionicons  name="close-outline" size={65} color="#f74c4f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSwipe} activeOpacity={0.7} onPress={handleLike}>
            <Ionicons  name="heart" size={50} color="#00f99e" />
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
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20,
  },
  headerR: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 20,
    marginVertical: 5,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  main: {
    width: '100%',
    height: '91%',
    alignItems: 'center',
    justifyContent:"space-around"
  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.70,
    // Adapter la largeur à un pourcentage de la largeur de l'écran
    width: width * 0.93,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 15,
    paddingTop: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 10,
  },
  profileImage: {
    // Adapter la hauteur et la largeur à un pourcentage de la hauteur de l'écran
    width: width * 0.95,
    height: height * 0.4,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    width: '90%',
  },
  star: {
    width: 30,
    height: 30,
    marginHorizontal: 1,
  },
  infos: {
    width: '89%',
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
    borderTopColor: 'gray',
    borderTopWidth: 1.5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1.5,
    paddingLeft: 10,
  },
  profileNote: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bioLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 15,
  },
  bioText: {
    fontSize: 18,
    width: '90%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  buttonSwipe: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent:"center",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20.0,
    elevation: 40,
  },
});






*/