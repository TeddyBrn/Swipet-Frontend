import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#3497CE',
        tabBarInactiveTintColor: '#222222',
        tabBarActiveBackgroundColor: '#A7A7A7',
        tabBarInactiveBackgroundColor: '#A7A7A7',
        headerShown: false
      })}>
      <Tab.Screen name="Filtres" component={FilterScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreenUser} />
            <Stack.Screen name="SignUpAnimal" component={SignUpScreenAnimal} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>   
      </NavigationContainer>
    </Provider>
  );
}
