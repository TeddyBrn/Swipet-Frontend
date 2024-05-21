import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PaymentScreen({ navigation }) {

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={60} color="#E06359" />
          </TouchableOpacity>
          <View style={styles.topMid}>
            <Text style={styles.topText}>Moyen de</Text>
            <Text style={styles.topText}>paiement</Text>
          </View>
          <Image
            source={require('../assets/miniLogo.png')}
            style={styles.logo}
          />
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    topContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 30
      },
      topMid: {
        alignItems: 'center'
      },
      topText: {
        fontSize: 25,
        fontWeight: 'bold'
      },
      logo: {
        width: 85,
        height: 85,
        resizeMode: 'contain'
      },
    checkboxContainer : {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logo: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
        },
})