import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { profilData } from "../data/profils";



export default function DiscussionScreen({navigation, route}) {

const matchId = route;

const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_ADRESS}/messages/${matchId}`);
        const data = await response.json();
        if (data) {
          setMatchData(data.data);
        } else {
          setError("Failed to fetch matchs");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const messages = matchData.messages.map((data, i)=> {
    <TouchableOpacity key={i} onPress={()=> deleteMessage()} style={styles.messageCard}>
      <Image 
        style={styles.messageImage}
        source={{ uri: matchData.petsitterId.url }}
      />
      <View style={styles.message}>{data}</View>
    </TouchableOpacity>
  })

  const handleProposal = () => {

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


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.back}>
                    <Ionicons name="chevron-back" size={60} color="#33464d" />
                </TouchableOpacity>
                <View style={styles.topMid}>
                    <Text style={styles.topText}>{matchData.petsitterId.firstname}</Text>
                    <Image 
                        style={styles.messageImage}
                        source={{ uri: matchData.petsitterId.url }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => ()}
                    style={styles.proposal}>
                </TouchableOpacity>
                <View style={{ width: 80 }}></View>
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
        justifyContent: 'space-between',
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
      back: {
        width: 80,
        alignItems: 'center'
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