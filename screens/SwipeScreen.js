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
        <Text style={styles.profileName}>Sarah, 6 ans</Text>
        <Text style={styles.bioLabel}>Bio</Text>
        <Text style={styles.bioText}>
          J'aime les animaux pour leur faire des gros calinous et des poutous
          baveux ainsi que les emmener en balades, non je rigole je veux juste
          de la moula 💵 .
        </Text>
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
    // marginBottom: 10
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
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingTop: 40
  },
  profileImage: {
    width: '90%',
    height: 380,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    resizeMode: 'contain'
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  star: {
    width: 30,
    height: 30,
    marginHorizontal: 2
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
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
