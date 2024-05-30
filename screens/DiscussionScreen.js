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
import moment from 'moment';
import { addMessage } from '../reducers/matchs';
import { BACKEND_ADRESS } from '../data/urlData';



export default function DiscussionScreen({navigation, route}) {

const dispatch = useDispatch();
const user = useSelector((state) => state.users.value);
// const matchId = '6655fe621b2c12e4dc4091e1'
const matchId = route.params;
console.log(route)
console.log(matchId)

const [matchData, setMatchData] = useState([]);
const [messageData, setMessagesData] = useState([]);
const [newMessage, setNewMessages] = useState('');
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

  if (!messageData) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={60} color="#33464d" />
            </TouchableOpacity>
            <View style={styles.topMid}>
              <Text style={styles.topText}>Messages</Text>
            </View>
            <View style={{ width: 60 }}></View>
          </View>
          <Text style={styles.text}>Vous n'avez pas encore de messages !</Text>
          <View style={styles.newMessageContainer}>
            <View style={styles.input}>
              <Ionicons name="person" size={20} color="#33464d" />
              <TextInput
                  style={styles.inputText}
                  onChangeText={(value) => setNewMessages(value)}
                  value={newMessage}
                  placeholder="Nouveau message"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
              />
            </View>
                <TouchableOpacity
                  onPress={() => handleNewMessage()}
                  style={styles.newMessage}>
                  <Text style={styles.buttonMessageText}>Envoyer</Text>
                </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

  console.log('data', matchData)

  matchData.length && console.log(matchData[0].petsitter_id)

  const messages = messageData.map((data, i)=> {
    const date = moment(data.created_at).fromNow()
    console.log(date)
    return (
      <View style={styles.messagesCard}>
        <TouchableOpacity key={i} onPress={()=> deleteMessage()} style={styles.messageCard}>
        {matchData[0].petsitter_id.photo && <Image 
            style={styles.messageImage}
            source={{ uri: matchData[0].petsitter_id.photo }}
          />}
          <View style={styles.messageContent}><Text>{data.content}</Text></View>
          <View style={styles.messageDate}><Text>{date}</Text></View>
        </TouchableOpacity>
      </View>
    )
  })

  console.log(messageData)

  const handleProposal = () => {
    NavigationHelpersContext.navigate('Proposal', {matchId})
  }

  const handleNewMessage = () => {
    fetch(`${BACKEND_ADRESS}/messages/newMessage/${matchId}/${user.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: newMessage,
      })
    }).then((response) => response.json())
    .then((data) => {
      if(data.result) {
        dispatch(addMessage(data.message))
        setNewMessages('');
      }
    })
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
                    <Text style={styles.buttonProposalText}>Proposition</Text>
                </TouchableOpacity>
                <View style={{ width: 80 }}></View>
            </View>
        <View style={styles.messagesContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ height: '100%', width: '100%' }}>
          {messages}
          </ScrollView>
        </View>
        <View style={styles.newMessageContainer}>
            <View style={styles.input}>
              <Ionicons name="person" size={20} color="#33464d" />
              <TextInput
                  style={styles.inputText}
                  onChangeText={(value) => setNewMessages(value)}
                  value={newMessage}
                  placeholder="Nouveau message"
                  placeholderTextColor="#5a7869"
                  autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              onPress={() => handleNewMessage()}
              style={styles.newMessage}>
              <Text style={styles.buttonMessageText}>Envoyer</Text>
            </TouchableOpacity>
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
      },
      input: {
        borderRadius: 5,
        borderBottomWidth: 1.5,
        width: '80%',
        padding: 10,
        marginVertical: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#33464d'
      },
      newMessage: {
        backgroundColor: '#5a7869',
        borderColor: '#33464d',
        width: '20%',
        paddingVertical: 10,
        alignItems: 'right',
        borderRadius: 5,
        borderWidth: 1.5
      },
      buttonMessageText: {
        color: '#fff',
        fontSize: 23,
        fontFamily: 'Montserrat-Bold'
      },
      messagesCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        backgroundColor: '#ffffff',
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
      },
      messageContent: {

      },
      messageDate: {

      },
      newMessageContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowColor: '#000000',
      },
    });