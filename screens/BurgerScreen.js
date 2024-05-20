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
import { burgersData } from "../data/burgers";
import Burger from "../components/Burger";
import { useSelector } from "react-redux";

export default function BurgerScreen({ navigation }) {
  const burgers = useSelector((state) => state.favorite.value);

  const burgersList = burgersData.map((data, i) => {
    const isFavorite = burgers.some((burger) => burger.name === data.name);
    return <Burger key={i} recipe={data} isFavorite={isFavorite} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.burgersContainer}>
        {burgersList}
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

    width: "100%"
  }
});
