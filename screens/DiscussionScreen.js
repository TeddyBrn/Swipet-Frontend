import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { addMessage, addName } from '../reducers/matchs';
import { BACKEND_ADRESS } from '../data/urlData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function DiscussionScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const match = useSelector((state) => state.matchs.value);

  const matchId = route.params;

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
    
      try {
        const response = await fetch(`${BACKEND_ADRESS}/messages/${matchId}`);
        const data = await response.json();

        if (data.result) {
          setMatchData(data.match);
          setMessagesData(data.match[0].messages);
          dispatch(addName({name:data.match[0].petsitter_id.firstname}))
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
  }, [messageData]);

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
  
  const messages = messageData.map((data, i) => {
    const date = moment(data.created_at).fromNow();
   
    return (
      <View
        style={[
          styles.messageWrapper,
          data.tokenAuthor !== user.token && styles.youMessage
        ]}
        key={i}>
        <View
          style={[
            styles.message,
            data.tokenAuthor !== user.token && styles.youMessageBG
          ]}>
          <Text style={styles.messageText}>{data.content}</Text>
        </View>
        <Text style={styles.timeText}>{date}</Text>
      </View>
    );
  });

  

  const handleProposal = () => {
    navigation.navigate('Proposal', { matchId });
  };

  const handleNewMessage = () => {
    fetch(`${BACKEND_ADRESS}/messages/newMessage/${matchId}/${user.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: newMessage
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addMessage(data.message));
          
          setNewMessages('');
        }
      });
  };
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
        {matchData[0] && (
          <View style={styles.topMid}>
            <Image source={{uri: matchData[0].petsitter_id.photo}} style={styles.topImage} />
            <Text style={styles.topText}>
              {matchData[0].petsitter_id.firstname}
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => handleProposal()}
          style={styles.proposal}>
          <Text style={styles.proposalText}>Proposition</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.messagesContainer}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ height: '90%', width: '100%' }}>
          {messages}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(value) => setNewMessages(value)}
          value={newMessage}
          style={styles.input}
          autoFocus
        />
        <TouchableOpacity
          onPress={() => handleNewMessage()}
          style={styles.sendButton}>
          <MaterialIcons name="send" color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20
  },
  back: {
    width: 80,
    alignItems: 'center'
  },
  topMid: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  topText: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  topImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10
  },

  proposal: {
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#5a7869',
    marginRight: 10
  },
  proposalText: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff'
  },
  messagesContainer: {
    height: '75%',
    width: '90%'
  },
  messageWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20
  },
  message: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    backgroundColor: '#a2d6bc',
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: '65%'
  },
  youMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  youMessageBG: {
    backgroundColor: '#eee'
  },
  messageText: {
    color: '#506568',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20
  },
  timeText: {
    color: '#506568',
    fontSize: 12,
    marginTop: 2
  },

  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    alignContent: 'flex-start',
    marginBottom: 30,
    marginTop: 'auto',
    background: 'transparent',
    paddingLeft: 20,
    paddingRight: 20
  },
  input: {
    backgroundColor: '#f0f0f0',
    width: '80%',
    padding: 14,
    borderRadius: 30,
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#5a7869',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2
  }
});
