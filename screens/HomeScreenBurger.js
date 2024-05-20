import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Platform
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/bk.jpg")}
      style={styles.background}>
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("TabNavigator")}>
        <Text style={styles.text}>HomeScreen</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 450,
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%"
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 50,
    backgroundColor: "#e58e26",
    borderRadius: 10,
  },
  text: {
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20
  }
});
