import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Modal,
  Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AvisScreen({ navigation }) {
  const [note, setNote] = useState(0);
  const [comment, setComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = { cursor: 'pointer' };
    if (i < note) {
      style = { color: '#ffce0c' };
    }
    stars.push(
      <Ionicons
        key={i}
        name="star"
        size={23}
        color={style.color}
        onPress={() => setNote(i + 1)}
        style={style}
      />
    );
  }

  const handleValidate = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Swipe');
  };

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
            <Text style={styles.topText}>Avis</Text>
          </View>
          <View style={{ width: 80 }}></View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Laissez un avis</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Écrivez votre avis ici..."
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.ratingContainer}>
            <Text style={styles.label}>Laissez une note</Text>
            <View style={styles.starsContainer}>{stars}</View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleValidate}>
            <Text style={styles.submitButtonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Merci pour votre avis !</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleCloseModal}>
        <Text style={styles.closeButtonText}>Fermer</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
}

// Récupère les dimensions de l'écran
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  topContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
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
  contentContainer: {
    width: width * 0.9,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#33464d',
    marginTop: 250,
    marginLeft: 20,
  },
  textArea: {
    width: '95%',
    height: height * 0.25,
    borderColor: '#33464d',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    paddingBottom: 20
  },
  ratingContainer: {
    alignItems: 'center',
    paddingBottom: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  },
  starsContainer: {
    flexDirection: 'row'
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#33464d',
    padding: 10,
    borderRadius: 5,
    width: width * 0.4
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18
  },
  closeButton: {
    backgroundColor: '#33464d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  }
  
});
