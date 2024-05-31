import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';


export default function MasterCard({ props }) {
  const user = useSelector((state) => state.users.value);

  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.profileImage}
        source={{ uri: props.photoUrl }}
      />
      <View style={styles.infos}>
        <Text style={styles.profileName}>
          {props.name} , {props.age} ans,{' '}
          {props.gender}
        </Text>
        <Text style={styles.profileCity}>
          <Ionicons name="location-outline" size={22} color="#33464d" />{' '}
          {user.city}
        </Text>
        <View style={styles.ratingContainer}>
          {/* {props.avis[0]?.note ? (
            <View style={styles.ratingContainer}>
              <Text style={styles.profileNote}>{props.avis[0].note}/5</Text>
              {Array(5)
                .fill()
                .map((_, i) => {
                  const fullStars = Math.floor(props.avis[0].note); // Partie entière de la note
                  const fractionalStar = props.avis[0].note % 1; // Fraction de la note

                  if (i < fullStars) {
                    // Étoiles entières
                    return (
                      <Ionicons key={i} name="star" size={23} color="#ffce0c" />
                    );
                  } else if (i === fullStars && fractionalStar > 0) {
                    // Étoile partielle
                    return (
                      <View
                        key={i}
                        style={{
                          position: 'relative',
                          width: 23,
                          height: 23
                        }}>
                        <Ionicons name="star" size={23} color="#444" />
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: `${fractionalStar * 100}%`,
                            height: '100%',
                            overflow: 'hidden'
                          }}>
                          <Ionicons name="star" size={23} color="#ffce0c" />
                        </View>
                      </View>
                    );
                  } else {
                    // Étoiles vides
                    return (
                      <Ionicons key={i} name="star" size={23} color="#444" />
                    );
                  }
                })}
            </View>
          ) : (
            <Text style={styles.profileNote}>Pas d'avis</Text>
          )} */}
        </View>
        <Text style={styles.bioLabel}>Bio</Text>
        <Text style={styles.bioText}>{props.bio}</Text>
        <Text style={styles.bioLabel}>Détail de la Garde</Text>
        <Text style={styles.bioText}>{props.detail}</Text>
      </View>
    </View>
  );
}

// Récupère les dimensions de l'écran
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  profileContainer: {
    // Adapter la hauteur à un pourcentage de la hauteur de l'écran
    height: height * 0.78,
    // Adapter la largeur à un pourcentage de la largeur de l'écran
    width: width * 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e1ede7',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 10,
    marginTop: -45
  },
  profileImage: {
    // Adapter la hauteur et la largeur à un pourcentage de la hauteur de l'écran
    width: '100%',
    height: height * 0.35,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderRadius: 3
  },
  infos: {
    width: '90%',
    marginTop: 5
  },
  profileName: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold'
  },
  profileCity: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666'
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileNote: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666',
    paddingHorizontal: 10
  },
  bioLabel: {
    fontSize: 25,
    color: '#222',
    fontFamily: 'Quicksand-Bold',
    marginTop: 20,
    marginBottom: 5
  },
  bioText: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    color: '#666'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  buttonSwipe: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.15,
    shadowRadius: 20.0,
    elevation: 40
  }
});
