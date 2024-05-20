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
import FavoriteScreen from "./screens/FavoriteScreen";
import BurgerScreen from "./screens/BurgerScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
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
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#1e272e",
        headerShown: false
      })}>
      <Tab.Screen name="Filtre" component={BurgerScreen} />
      <Tab.Screen name="SwipeScreen" component={SwipeScreen} />
      <Tab.Screen name="Message" component={FavoriteScreen} />
      
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
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
