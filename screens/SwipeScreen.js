import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileCard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerR}>
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.headerText}>SWIPET</Text>
        </View>
        <View style={styles.headerR}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" size={35} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={35} color="#222" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/myprofile.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.ratingContainer}>
            {Array(5)
              .fill()
              .map((_, i) => (
                <Image
                  key={i}
                  source={require('../assets/star.png')}
                  style={styles.star}
                />
              ))}
          </View>
          <View style={styles.infos}>
            <Text style={styles.profileName}>Sarah, 6 ans</Text>
            <Text style={styles.bioLabel}>Bio</Text>
            <Text style={styles.bioText}>
              J'aime les animaux pour leur faire des gros calinous et des
              poutous baveux ainsi que les emmener en balades, non je rigole je
              veux juste de la moula 💵 .
            </Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.dislikeButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation:9,
  },
  headerR: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  iconButton: {
    marginHorizontal: 10
  },
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  profileContainer: {
    height: '80%',
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#54545420',
    borderRadius: 15,
    paddingTop: 8
  },
  profileImage: {
    width: '95%',
    height: 340,
    borderRadius: 15,
    resizeMode: 'cover'
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    width: '90%'
  },
  star: {
    width: 30,
    height: 30,
    marginHorizontal: 1
  },
  infos: {
    width: '89%',
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
    borderTopColor: "gray",
    borderTopWidth: 1.5,
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
    paddingLeft: 10
  },
  bioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  bioText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    width: '90%'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10
  },
  dislikeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 30,
    width: 60,
    alignItems: 'center'
  },
  likeButton: {
    backgroundColor: '#4dff4d',
    padding: 10,
    borderRadius: 30,
    width: 60,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  }
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
