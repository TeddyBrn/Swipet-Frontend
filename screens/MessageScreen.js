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



export default function MessageScreen({navigation}) {
  // const burgers = useSelector((state) => state.favorite.value);

  // let favorite = <Text style={styles.text}>Vous n'avez pas encore de matchs !</Text>;
  // if (burgers.length > 0) {
  //   favorite = burgers.map((data, i) => {
  //     return <Burger key={i} {...data} isFavorite inFavorite />;
  //   });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.burgersContainer}>
      <Text style={styles.text}>Vous n'avez pas encore de matchs !</Text>
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