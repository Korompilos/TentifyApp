import { StyleSheet, Text, View, Platform, Button, Image, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';

const shelter = () => {

    const [randomNumber, setRandomNumber] = useState(null);
    const [showShelter, setShowShelter] = useState(false);
    
        useEffect(() => {
            const fetchRandomNumber = async () => {
                const storedNumber = await AsyncStorage.getItem('weatherRandomNumber');
                if (storedNumber) {
                    setRandomNumber(parseInt(storedNumber, 10));
                }
            };
            fetchRandomNumber();
        }, []);

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png') // Εικόνα για Web
        : require('../assets/images/top2.png'); // Εικόνα για Expo Go (Mobile)
    
        const handleFindShelter = () => {
            if (randomNumber != 3) {
                window.alert('Δε χρειάζεται να μετακινηθείτε σε καταφύγιο.');
                setShowShelter(false);
            } else {
                setShowShelter(true);
            }
        };


    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const loadSelectedButton = async () => {
            try {
                const storedButton = await AsyncStorage.getItem('selectedButton');
                if (storedButton) {
                    setSelectedButton(JSON.parse(storedButton));
                }
            } catch (error) {
                console.log('Error loading selected button:', error);
            }
        };

        loadSelectedButton();
    }, []);

    const mapImages = {
        1: require('../assets/images/map3.png'),
        2: require('../assets/images/map4.png'),
        3: require('../assets/images/map5.png'),
        4: require('../assets/images/map6.png'),
        5: require('../assets/images/map7.png'),
        6: require('../assets/images/map8.png'),
    };

    const mapImages2 = {
        1: require('../assets/images/map13.png'),
        2: require('../assets/images/map14.png'),
        3: require('../assets/images/map15.png'),
        4: require('../assets/images/map16.png'),
        5: require('../assets/images/map17.png'),
        6: require('../assets/images/map18.png'),
    };

    const selectedMapImage = selectedButton ? mapImages[selectedButton] : require('../assets/images/map2.png');

    const selectedMapImage2 = selectedButton ? mapImages2[selectedButton] : selectedMapImage;

  return (
    <SafeAreaProvider>
    
                <SafeAreaView style={styles.centeredView}>
                    <ImageBackground
                        source={require('../assets/images/background-image2.jpg')}
                        style={styles.container}
                        resizeMode="cover"
                    >
    
    
                        {/* Header Image */}
                        <Image
                            source={headerImageSource}
                            style={styles.headerImage}
                            resizeMode="contain"
                        />
    
                        {/* Map */}
                        <Image
                            source={showShelter ? selectedMapImage2 : selectedMapImage}
                            style={styles.mapImage}
                            resizeMode="contain"
                        />

    <View style={styles.shelter}>
                            
       <Button title="Find Shelter" onPress={handleFindShelter} style={styles.btn}/>
    </View>
    </ImageBackground>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default shelter

const styles = StyleSheet.create({
    container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#606FB6',
        },
        headerImage: {
            width: '100%',
            height: Platform.OS === 'web' ? 200 : 150,
            marginTop: Platform.OS === 'web' ? 0 : 40,
            position: 'absolute',
            top: Platform.OS === 'web' ? -60 : -70,
        },
        shelter: {
            top: 655,
            right: 0,
            width: 700,
        },
        mapImage: {
                width: Platform.OS === 'web' ? 700 : 350, // Κάνει την εικόνα να πιάνει όλο το πλάτος
                height: Platform.OS === 'web' ? 700 : 350, // Ρύθμιση ύψους για Web/Mobile
                marginTop: Platform.OS === 'web' ? 0 : 40, // Προσαρμογή για κινητές συσκευές
                position: 'absolute', // Τοποθέτηση πάνω πάνω
                top: Platform.OS === 'web' ? 20 : 50,
                marginRight: Platform.OS === 'web' ? 0 : 0
            },
    image: {
        width: 30, // Μέγεθος κουμπιού
        height: 39,
        position: 'absolute'
    },
})