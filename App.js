import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFonts } from 'expo-font';
import { useCallback } from 'react';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import users from './reducers/users';

const store = configureStore({
  reducer: { users }
});

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreenUser from './screens/SignUpScreenUser';
import SignUpScreenAnimal from './screens/SignUpScreenAnimal';
import FilterScreen from './screens/FilterScreen';
import SwipeScreen from './screens/SwipeScreen';
import MessageScreen from './screens/MessageScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfilScreen from './screens/ProfilScreen';
import ProfileAnimalScreen from './screens/ProfilAnimalScreen';
import HistoriqueScreen from './screens/HistoriqueScreen';
import AvisScreen from './screens/AvisScreen';
import PaymentScreen from './screens/PaymentScreen';
import MyProfil from './screens/MyProfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Swipe"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Filtres') {
            iconName = 'filter';
          } else if (route.name === 'Messages') {
            iconName = 'chatbubbles';
          } else if (route.name === 'Swipe') {
            iconName = 'home';
          }

          return <Ionicons name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: '#5a7869',
        tabBarInactiveTintColor: '#33464d',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: { height: 70, },
        headerShown: false
      })}>
      <Tab.Screen name="Filtres" component={FilterScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'AlfaSlabOne-Regular': require('./assets/fonts/AlfaSlabOne-Regular.ttf'),
    'PoetsenOne-Regular': require('./assets/fonts/PoetsenOne-Regular.ttf'),
    'Montserrat-Black': require('./assets/fonts/Montserrat/Montserrat-Black.ttf'),
    'Montserrat-BlackItalic': require('./assets/fonts/Montserrat/Montserrat-BlackItalic.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('./assets/fonts/Montserrat/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('./assets/fonts/Montserrat/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('./assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
    'Montserrat-ExtraLightItalic': require('./assets/fonts/Montserrat/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat-Italic': require('./assets/fonts/Montserrat/Montserrat-Italic.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('./assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-Thin': require('./assets/fonts/Montserrat/Montserrat-Thin.ttf'),
    'Montserrat-ThinItalic': require('./assets/fonts/Montserrat/Montserrat-ThinItalic.ttf'),
    'Quicksand-Bold': require('./assets/fonts/Quicksand/Quicksand-Bold.ttf'),
    'Quicksand-Light': require('./assets/fonts/Quicksand/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('./assets/fonts/Quicksand/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('./assets/fonts/Quicksand/Quicksand-SemiBold.ttf'),





  });
    
    if (!fontsLoaded) {
    return null;
    }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreenUser} />
          <Stack.Screen name="SignUpAnimal" component={SignUpScreenAnimal} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Profil" component={ProfilScreen} />
          <Stack.Screen name="ProfilAnimal" component={ProfileAnimalScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Historique" component={HistoriqueScreen} />
          <Stack.Screen name="Avis" component={AvisScreen} />
          <Stack.Screen name="MyProfil" component={MyProfil} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
