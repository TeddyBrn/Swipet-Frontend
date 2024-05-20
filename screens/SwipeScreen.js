import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileCard() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.jpg')} style={styles.logo} />
                <Text style={styles.headerText}>SWIPET</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../assets/bell.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../assets/settings.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <Image source={require('../assets/profile.png')} style={styles.profileImage} />
                <View style={styles.ratingContainer}>
                    {Array(5).fill().map((_, i) => (
                        <Image key={i} source={require('../assets/star.png')} style={styles.star} />
                    ))}
                </View>
                <Text style={styles.profileName}>Celestine, 26 ans</Text>
                <Text style={styles.bioLabel}>Bio</Text>
                <Text style={styles.bioText}>
                    J'aime les animaux pour leur faire des gros calinous et des poutous baveux ainsi que les emmener en balades, non je rigole je veux juste de la moula 🐝.
                </Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.dislikeButton} activeOpacity={0.7}>
                        <Text style={styles.buttonText}>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
                        <Text style={styles.buttonText}>✓</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconButton: {
        marginHorizontal: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
    },
    profileImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    star: {
        width: 20,
        height: 20,
        marginHorizontal: 2,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bioLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    bioText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    dislikeButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 30,
        width: 60,
        alignItems: 'center',
    },
    likeButton: {
        backgroundColor: '#4dff4d',
        padding: 10,
        borderRadius: 30,
        width: 60,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
    },
   
});

/*
Dans dossier assets
logo.jpg
bell.png
home.png
profile.png
settings.png
conversation.png
filter.png
star.png

Dans app.tsx 
import SwipeScreen from './screens/SwipeScreen';

...

<Stack.Screen name="TabNavigator" component={TabNavigator} />

...
ou  <Tab.Screen name="SwipeScreen" component={SwipeScreen} />
*/