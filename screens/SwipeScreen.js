import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../reducers/users';
import { profilData } from '../data/profils';

export default function ProfileCard({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const addAlike = () => dispatch(addLike(profilData[count]._id));

  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const [note, setNote] = useState(0);

  useEffect(() => {
    setName(profilData[0].firstname);
    setAge(profilData[0].age);
    setCity(profilData[0].city);
    setBio(profilData[0].bio);
    setImg(profilData[0].url);
    setNote(profilData[0].avis[0].note);
  }, []);

  const handleLike = () => {
    setCount(count + 1);
    setName(profilData[count].firstname);
    setAge(profilData[count].age);
    setCity(profilData[count].city);
    setBio(profilData[count].bio);
    setImg(profilData[count].url);
    setNote(profilData[count].avis[0].note);
    addAlike();
  };

  const handleDislike = () => {
    setCount(count + 1);
    setName(profilData[count].firstname);
    setAge(profilData[count].age);
    setCity(profilData[count].city);
    setBio(profilData[count].bio);
    setImg(profilData[count].url);
    setNote(profilData[count].avis[0].note);
  };

  const swipe = () => {
    if (!profilData[count]) {
      return (
        <View style={styles.main}>
          <Text style={[styles.profileName, {color: '#33464d'}]}>No Match Found</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.main}>
          <View style={styles.profileContainer} blurRadius={90}>
            <Image style={styles.profileImage} source={img} />
            <View style={styles.infos}>
              <Text style={styles.profileName}>
                {name} , {age} ans
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.profileCity}> {city}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.profileNote}>{note}/5</Text>
                  {Array(5)
                    .fill()
                    .map((_, i) =>
                      i < Math.round(note) ? (
                        <Ionicons key={i} name="star" size={23} color="#ffce0c" />
                      ) : (
                        <Ionicons key={i} name="star" size={23} color="#444" />
                      )
                    )}
                </View>
              </View>
              <Text style={styles.bioLabel}>Bio</Text>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.buttonSwipe}
              activeOpacity={0.7}
              onPress={handleDislike}>
              <Ionicons name="close-outline" size={65} color="#f74c4f" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSwipe}
              activeOpacity={0.7}
              onPress={handleLike}>
              <Ionicons name="heart" size={50} color="#00f99e" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

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
              <Ionicons  name="notifications" size={35} color="#33464d" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}>
              <Ionicons  name="settings-outline" size={35} color="#33464d" />
            </TouchableOpacity>
          </View>
        </View>
          {swipe()}
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
    backgroundColor: '#d5e8de'
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
      height: 18
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
    resizeMode: 'contain',
    marginLeft: 20,
    marginVertical: 5
  },
  iconButton: {
    marginHorizontal: 10
  },
  main: {
    width: '100%',
    height: '91%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.7,
    // Adapter la largeur à un pourcentage de la largeur de l'écran
    width: width * 0.93,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e8efeb',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20
  },
  profileImage: {
    // Adapter la hauteur et la largeur à un pourcentage de la hauteur de l'écran
    width: '100%',
    height: height * 0.4,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderRadius: 3
  },
  infos: {
    width: '90%'
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
    width: '100%',
    
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
