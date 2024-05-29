import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { profilData } from "../data/profils";
import { BACKEND_ADRESS } from '../data/urlData';



export default function DiscussionScreen({navigation, route}) {

const matchId = '66546234e2b20002e3e6d313';

const [matchData, setMatchData] = useState([]);
const [messageData, setMessagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect( async () => {
  //   console.log('start useeffect')
  //  await fetch(`${BACKEND_ADRESS}/messages/${matchId}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('r',data)
  //     setMatchData(data.match);
  //     setMessagesData(data.match[0].messages)
  //   });
    // }, []);

    useEffect(() => {
      (async () => {
        // const fetchData = async () => {
        try {
          const response = await fetch(`${BACKEND_ADRESS}/messages/${matchId}`);
          const data = await response.json();
  
          if (data.result) {
              console.log('r',data)
              setMatchData(data.match);
              setMessagesData(data.match[0].messages)
          } else {
            setError('Failed to fetch matchs');
          }
        } catch (err) {
          setError('An error occurred');
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }, []);



  console.log('data', matchData)
  console.log(messages)
  matchData.length && console.log(matchData[0].petsitter_id)

  const messages = messageData.map((data, i)=> {
    <TouchableOpacity key={i} onPress={()=> deleteMessage()} style={styles.messageCard}>
     {matchData[0].petsitter_id.url && <Image 
        style={styles.messageImage}
        source={{ uri: matchData[0].petsitter_id.url }}
      />}
      <View style={styles.messageContent}>{data.content}</View>
      <View style={styles.messageDate}>{data.created_at}</View>
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
                    {matchData[0] && <Text style={styles.topText}>{matchData[0].petsitter_id.firstname}</Text>}
                    {matchData[0].petsitter_id.url && <Image 
                        style={styles.messageImage}
                        source={{ uri: matchData[0].petsitter_id.url }}
                    />}
                </View>
                <TouchableOpacity
                    onPress={() => handleProposal()}
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