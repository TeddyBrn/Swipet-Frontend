import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { BACKEND_ADRESS } from '../data/urlData';

export default function MessageScreen({ navigation }) {
  const [matchsData, setMatchsData] = useState([]);
  const [matchsTab, setMatchsTab] = useState([]);
  const [messagesTab, setMessagesTab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BACKEND_ADRESS}/matchs/${user.token}`);
        const data = await response.json();

        if (data.result) {
          setMatchsTab(data.matches.filter((match) => !match.messages.length));
          setMessagesTab(data.matches.filter((match) => match.messages.length));
          setMatchsData(data.matches);
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


  console.log('matchsTab', matchsTab);
  const matchs = matchsTab.map((match, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => navigation.navigate('Discussion', match._id)}>
        {match.petsitter_id.photo && (
          <Image
            style={styles.matchImage}
            source={{ uri: match.petsitter_id.photo }}
          />
        )}
        <Text style= {styles.matchImageText}>{match.petsitter_id.firstname}</Text>
      </TouchableOpacity>
    );
  });

  const messages = messagesTab.map((data, i) => {
    return (
      <View style={styles.messageCard}>
        <TouchableOpacity
          key={i}
          onPress={() => navigation.navigate('Discussion', data._id)}
          style={styles.messageCard}>
          <Image
            style={styles.messageImage}
            source={{ uri: data.petsitter_id.photo }}
          />
          <View style={styles.messageTextContainer}>
            <Text style={styles.matchName}>{data.petsitter_id.firstname}</Text>
            <Text style={styles.matchMessage}>{data.messages[0].content}</Text>
          </View>
        </TouchableOpacity>
        //{' '}
      </View>
    );
  });

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
        <Text style={styles.matchMessage}>Vous n'avez pas encore de matchs !</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/miniLogo.png')} style={styles.logo} />
        <View style={styles.topMid}>
          <Text style={styles.topText}>Messages</Text>
        </View>
        <View style={{ width: 60 }}></View>
      </View>
      <View style={styles.matchsContainer}>
        <Text style={styles.matchText}>Vos matchs</Text>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={true}
          style={{ height: '100%', width: '100%' }}>
          <View style={styles.matchesPhotoContainer}>{matchs}</View>
        </ScrollView>
      </View>
      <View style={styles.messagesContainer}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ height: '100%', width: '100%' }}>
          {messages}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

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
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 20
  },
  logo: {
    width: 60,
    height: 60,
    marginVertical: 5
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
  matchsContainer: {
    height: height * 0.15,
    width: width * 0.85,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: '#333333'
  },
  matchText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  matchesPhotoContainer: {
    width: '97%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  matchImage: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#33464d',
    width: 70,
    height: 70,
    marginLeft: 15
  },
  matchImageText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d',
    textAlign: 'center'
  },
  messagesContainer: {
    height: height * 0.65,
    width: width * 0.85
  },
  messageCard: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#33333390',
    width: '100%',
    height: 100,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  messageImage: {
    height: 65,
    width: 65,
    borderRadius: 50,
    borderWidth: 1
  },
  messageTextContainer: {
    width: '80%',
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'space-around'
  },
  matchName: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#33464d'
  },
  matchMessage: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#33464d',
    height: '50%'
  }
});
