import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favorite from "./reducers/favorite";

const store = configureStore({
  reducer: { favorite }
});

import HomeScreen from "./screens/HomeScreen";
import Connection from './screens/ConnectionScreen';
import SwipeScreen from './screens/SwipeScreen';
import SettingsScreen from './screens/SettingsScreen';
import MessageScreen from "./screens/MessageScreen";
import BurgerScreen from "./screens/BurgerScreen";
import SignIn from "./screens/SignIn"
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="SwipeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Filtre") {
            iconName = "filter";
          } else if (route.name === "Message") {
            iconName = "mail";
          } else if (route.name === "SwipeScreen") {
            iconName = "home";
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#3497CE",
        tabBarInactiveTintColor: "#222222",
        tabBarStyle: {
          backgroundColor:'#A7A7A7',
          shadowColor: 'black',  // couleur de l'ombre
          shadowOffset: { width: 0, height: 2 },  // décalage de l'ombre
          shadowOpacity: 0.50,
          shadowRadius: 5.46,
          elevation: 9,
         
        },
        headerShown: false,


      })}>
      <Tab.Screen name="Filtre" component={BurgerScreen} />
      <Tab.Screen name="SwipeScreen" component={SwipeScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />

    </Tab.Navigator>
  );
};






export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Connection" component={Connection} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
