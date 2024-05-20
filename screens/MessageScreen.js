import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from "react-native";
import { useSelector } from 'react-redux';
// import Burger from "../components/Burger";


export default function MessageScreen({navigation}) {
 

  let favorite = <Text style={styles.text}>Vous n'avez pas encore de matchs !</Text>;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.burgersContainer}>
        {favorite}
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#faf5ed"
  },
  burgersContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 300,
    color: "#502314",
  }
});