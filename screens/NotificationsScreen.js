import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={60} color="#33464d" />
        </TouchableOpacity>
        <View style={styles.topMid}>
          <Text style={styles.topText}>Notifications</Text>
        </View>
        <View style={{width: 60}}></View>
      </View>
      <Text style={styles.text}>Vous n'avez pas encore de notifications !</Text>
    </SafeAreaView>
  );
};

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
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20,
  },
  topMid: {
    alignItems: 'center'
  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  text: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 100,
    color: '#502314'
  }
});

export default NotificationsScreen;

/*


Dans app.tsx 
import NotificationsScreen from './screens/NotificationsScreen';

...

<Stack.Screen name="Notifications" component={NotificationsScreen} />

...



*/
