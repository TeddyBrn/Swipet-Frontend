import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { addBurger, removeBurger } from '../reducers/favorite';
import { FlatList } from "react-native";

export default function Burger({ recipe, navigation }) {
    const dispatch = useDispatch();

    const handleFavoritePress = () => {
      if (recipe.isFavorite) {
        dispatch(removeBurger(recipe));
      } else {
        dispatch(addBurger(recipe));
      }
    }

    let iconColor = {};
    iconColor = recipe.isFavorite ? '#E9BE59' : '#444444';

    return (
      <View style={styles.container}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Image source={recipe.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.bottomCard}>
          <Text style={styles.price}>{recipe.price}</Text>
          <Ionicons name="heart" size={30} color={iconColor} onPress={() => handleFavoritePress()}  />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
    padding: 10
  },
  name: {
    fontSize: 25,
    fontWeight: "600",
    color: "#502314"
  },
  image: {
    width: 200,
    height: 200
  },
  description: {
    fontSize: 16
  },
  bottomCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#502314"
  }
});
