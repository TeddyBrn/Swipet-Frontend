import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddCard() {
  const [lastname, setLastname] = useState('');

  // Formattage du numéro de carte

  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (number) => {
    // % Supprimer les espaces existants
    const cleaned = ('' + number).replace(/\s+/g, '');

    // % Ajouter des espaces après chaque groupe de 4 chiffres
    const formatted = cleaned.match(/.{1,4}/g)?.join('  ') || '';

    setCardNumber(formatted);
  };

  //  Formatage de la date d'expiration

  const [expirationDate, setExpirationDate] = useState('');

  const formatExpirationDate = (input) => {
    // % Supprimer les caractères non numériques
    const cleaned = input.replace(/\D+/g, '');

    // % Ajouter la barre oblique après les deux premiers chiffres (MM/YY)
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    setExpirationDate(formatted);
  };

  // Formatage du CVC

  const [cvc, setCvc] = useState('');

  const handleCvcChange = (input) => {
    // % Supprimer les caractères non numériques
    const cleaned = input.replace(/\D+/g, '');
    setCvc(cleaned);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Numéro de Carte :</Text>
        <View style={styles.input}>
          <Ionicons name="card" size={20} color="#33464d" />
          <TextInput
            style={styles.inputText}
            value={cardNumber}
            onChangeText={formatCardNumber}
            placeholder="1234  5678  9012  3456"
            keyboardType="numeric"
            maxLength={22}
            placeholderTextColor="#5a7869"
          />
        </View>
      </View>
      <View style={styles.bottomCard}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Date Expiration :</Text>
          <View style={styles.input}>
            <TextInput
              style={[styles.inputText, { paddingLeft: 0 }]}
              value={expirationDate}
              onChangeText={formatExpirationDate}
              placeholder="MM/YY"
              keyboardType="numeric"
              maxLength={5}
              placeholderTextColor="#5a7869"
            />
          </View>
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>CVC / CVV :</Text>
          <View style={styles.input}>
            <TextInput
              style={[styles.inputText, { paddingLeft: 0 }]}
              value={cvc}
              onChangeText={handleCvcChange}
              placeholder="123"
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
              placeholderTextColor="#5a7869"
            />
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom :</Text>
        <View style={styles.input}>
          <Ionicons name="person" size={20} color="#33464d" />
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => setLastname(value)}
            value={lastname}
            placeholder="Nom"
            placeholderTextColor="#5a7869"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.addCardButton}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 30
  },
  inputContainer: {
    width: '70%'
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginVertical: 5,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#33464d'
  },
  halfInput: {
    width: '40%',
    padding: 10,
    marginVertical: 10,
    paddingLeft: 20,
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#33464d'
  },
  label: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#5a7869',
    width: '100%'
  },
  bottomCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  inputText: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#5a7869',
    fontFamily: 'Quicksand-Bold',
    letterSpacing: 1,
    width: '90%'
  },
  halfInputText: {
    fontSize: 18,
    paddingLeft: 0,
    color: '#5a7869',
    fontFamily: 'Quicksand-Bold',
    letterSpacing: 1,
    width: '90%'
  },
  addCardButton: {
    backgroundColor: '#5a7869',
    borderColor: '#33464d',
    width: '45%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1.5,
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    fontFamily: 'Montserrat-Bold'
  }
});
