import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const [note, setNote] = useState(0);

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
    addAlike();
  };
  console.log(user.like)
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
          <Image source={img} style={styles.profileImage} />
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
          <TouchableOpacity activeOpacity={0.7} onPress={handleDislike}>
            <Ionicons name="close-circle-outline" size={80} color="#CD4F4F" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleLike}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#8FD14F" />
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
    height: '100%',
    alignItems: 'center',
  },
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.69,
    // Adapter la largeur à un pourcentage de la largeur de l'écran
    width: width * 0.9,
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
    elevation: 5,
  },
  profileImage: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    width: '95%',
    height: height * 0.4,
    borderRadius: 15,
    resizeMode: 'cover',
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
});



/*
Dans dossier assets
logo.jpg
bell.png
home.png
profile.png
settings.png
conversation.png
filter.png
star.png

Dans app.tsx 
import SwipeScreen from './screens/SwipeScreen';

...

<Stack.Screen name="TabNavigator" component={TabNavigator} />

...
ou  <Tab.Screen name="SwipeScreen" component={SwipeScreen} />






*/
