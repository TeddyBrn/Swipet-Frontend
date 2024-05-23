import React, {useState} from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PaymentScreen({ navigation }) {
  
  const [lastname, setLastname] = useState('');
  const [numberCard, setNumberCard] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCvc] = useState('');
 
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}>
            <Ionicons name="chevron-back" size={60} color="#33464d" />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Moyen de Paiement</Text>
          </View>
          <View style={{ width: 80 }}></View>
        </View>
        <View style={styles.inputContain}>
            <View style={styles.input}>
              <Text>Numéro de carte</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setNumberCard(value)}
                value={numberCard}
                placeholder="1234 5678 1077 5489"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.input}>
            <Text>Date d'expiration</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setDate(value)}
                value={date}
                placeholder="00/00"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.input}>
            <Text>cvc/cvv</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setCvc(value)}
                value={cvc}
                placeholder="000"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.input}>
            <Text>Nom</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(value) => setLastname(value)}
                value={lastname}
                placeholder="Nom"
                placeholderTextColor="grey"
                autoCapitalize="none"
              />
            </View>
            </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
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
  inputContainer: {
    flex: 1,
    alignItems: 'center'
},
inputContain: {
  width: '95%',
  padding: 10,
  paddingLeft: 20,
  marginTop: 20,
  alignItems: 'center'
},
input: {
  borderRadius: 10,
  borderBottomWidth: 1.5,
  width: '80%',
  padding: 10,
  marginVertical: 10,
  paddingLeft: 20,
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#33464d'
},
inputText: {
  fontSize: 18,
  paddingLeft: 10,
  color: '#5a7869'
}


});
