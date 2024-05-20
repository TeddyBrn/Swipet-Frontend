import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.jpg')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.title}>Notifications</Text>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },


});

export default NotificationsScreen;


/*


Dans app.tsx 
import NotificationsScreen from './screens/NotificationsScreen';

...

<Stack.Screen name="Notifications" component={NotificationsScreen} />

...



*/