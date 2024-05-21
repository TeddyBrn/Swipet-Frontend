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
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="close-circle-outline" size={80} color="#CD4F4F" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#8FD14F" />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.12,
    shadowRadius: 10.46,
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
    height: '78%',
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
    width: '89%'
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10,
    borderTopColor: 'gray',
    borderTopWidth: 1.5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1.5,
    paddingLeft: 10
  },
  bioLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 15
  },
  bioText: {
    fontSize: 18,
    width: '90%'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  
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
