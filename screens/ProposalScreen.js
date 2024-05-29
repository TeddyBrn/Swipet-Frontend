import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";

export default function Proposal({ navigation }) {
  const user = useSelector((state) => state.users.value);

  const formatExpirationDate = (input) => {
    // % Supprimer les caractères non numériques
    const cleaned = input.replace(/\D+/g, "");

    // % Ajouter la barre oblique après les deux premiers chiffres (MM/YY)
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    setExpirationDate(formatted);
  };

  const handlePress = () => {
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={60}
              color="#33464d"
              style={styles.back}
            />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Proposition</Text>
          </View>
          <View style={{ width: 80 }}></View>
        </View>
        <View style={styles.petsitter}>
          <Text style={styles.titles}>PetSitter</Text>
          <Text style={styles.petsitterText}>PetSitter name</Text>
        </View>
        <View style={styles.animal}>
          <Text style={styles.titles}>Animal à garder</Text>
          <Text style={styles.petsitterText}>Animaux</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.titles}>Dates</Text>
          <View style={styles.input}>
            <TextInput
              style={[styles.inputText, { paddingLeft: 0 }]}
              // value={expirationDate}
              // onChangeText={formatExpirationDate}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              maxLength={10}
              placeholderTextColor="#5a7869"
            />
          </View>
        </View>
        <View style={styles.prix}>
          <Text style={styles.titles}>Prix</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              // onChangeText={(value) => setName(value)}
              // value={name}
              placeholder="Saisissez votre prix"
              placeholderTextColor="#5a7869"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.infos}>
          <Text style={styles.titles}>Infos complémentaires</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              // onChangeText={(value) => setName(value)}
              // value={name}
              multiline={true}
              numberOfLines={4}
              placeholder="Infos complémentaires"
              placeholderTextColor="#5a7869"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          activeOpacity={0.8}
          // onPress={() => navigation.navigate("TabNavigator")}
          onPress={() => handlePress()}
        >
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  topContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000000",
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
    alignItems: "center",
  },
  topMid: {
    alignItems: "center",
  },
  topText: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "#33464d",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
  },
  imagePicker: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#33464d",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30,
  },
  image: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
  },
  inputContain: {
    width: "95%",
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    borderBottomWidth: 1.5,
    width: "80%",
    padding: 10,
    marginVertical: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#33464d",
  },
  inputText: {
    fontSize: 18,
    paddingLeft: 10,
    color: "#5a7869",
  },
  titles: {
    fontSize: 28,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#5a7869",
    borderColor: "#33464d",
    width: "55%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 70,
    borderWidth: 1.5,
  },
});
