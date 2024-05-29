import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  // SafeAreaView,
  ScrollView
} from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { profilData } from "../data/profils";



export default function MessageScreen({navigation}) {

  const [matchsData, setMatchsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_ADRESS}/matchs/${user.token}`);
        const data = await response.json();
        if (data.result) {
          setMatchsData(data.data);
        } else {
          setError("Failed to fetch matchs");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    console.log(`user.token => ${user.token}`);
    fetchData();
  }, []);
  
  console.log(matchsData)

  const messagesTab = []
  const matchsTab = [] 
  matchsData.map((data, i) => {
    if(data.messages == []) {
      matchs.push(data)
    } else {
      messages.push(data)
    };
  })
  
  const matchs = matchsTab.map((data,i) => {

    <TouchableOpacity key={i} onPress={()=> pressAmatch()} style={styles.matchCard}>
      <Image 
        style={styles.matchImage}
        source={{ uri: data.petsitterId.url }}
      />
    </TouchableOpacity>
  });

  const messages = messagesTab.map((data,i)=> {
    <TouchableOpacity key={i} onPress={()=> pressAmessage()} style={styles.messageCard}>
      <Image 
        style={styles.messageImage}
        source={{ uri: data.petsitterId.url }}
      />
      <Text style={styles.matchName}>{data.petsitter_id.firstname}</Text>
      <View style={styles.apreçuMessage}>{data.messages[0]}</View>
    </TouchableOpacity>
  })

  const pressAmatch = () => {
    
  }



  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!matchsData) {
    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={60} color="#33464d" />
        </TouchableOpacity>
        <View style={styles.topMid}>
          <Text style={styles.topText}>Messages</Text>
        </View>
        <View style={{width: 60}}></View>
      </View>
      <Text style={styles.text}>Vous n'avez pas encore de matchs !</Text>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.topContainer}>
          <Image
            source={require("../assets/miniLogo.png")}
            style={styles.logo}
          />
        <View style={styles.topMid}>
          <Text style={styles.topText}>Messages</Text>
        </View>
    </View>
    <View style={styles.matchsContainer}>
        <Text style={styles.matchText}>Vos matchs</Text>
          {matchs}
    </View>
    <View style={styles.messagesContainer}>
          {messages}
    </View>
  </SafeAreaView>
  )
}

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
  logo: {
    width: 60,
    height: 60,
    contentFit: "contain", //"resizeMode" is deprecated, use "contentFit" instead
    marginLeft: 20,
    marginVertical: 5,
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
