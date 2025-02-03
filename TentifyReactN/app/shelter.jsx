import { StyleSheet, Text, View, Platform, Button, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';

const shelter = () => {

    const [randomNumber, setRandomNumber] = useState(null);
    
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
            if (randomNumber === 3) {
                console.log('Βρέθηκε καταφύγιο!');
            } else {
                console.log('Δεν υπάρχει ανάγκη για καταφύγιο.');
            }
        };

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
                            source={require('../assets/images/map.png')}
                            style={styles.mapImage}
                            resizeMode="contain"
                        />
    <View style={styles.shelter}>
                            
       <Button title="Find Shelter" onPress={handleFindShelter}/>
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
            top: 270,
            right: -380
        },
        mapImage: {
                width: Platform.OS === 'web' ? 700 : 350, // Κάνει την εικόνα να πιάνει όλο το πλάτος
                height: Platform.OS === 'web' ? 700 : 350, // Ρύθμιση ύψους για Web/Mobile
                marginTop: Platform.OS === 'web' ? 0 : 40, // Προσαρμογή για κινητές συσκευές
                position: 'absolute', // Τοποθέτηση πάνω πάνω
                top: Platform.OS === 'web' ? 50 : 50,
                marginRight: Platform.OS === 'web' ? 750 : 0
            },
})