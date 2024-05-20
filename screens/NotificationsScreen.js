import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        

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



});

export default NotificationsScreen;


/*


Dans app.tsx 
import NotificationsScreen from './screens/NotificationsScreen';

...

<Stack.Screen name="Notifications" component={NotificationsScreen} />

...

*/