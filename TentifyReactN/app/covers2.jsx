import React from 'react';
import { View, Text } from 'react-native';
import {
    GestureHandlerRootView,
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import DragDrop from './dragdropcvrs';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Image } from 'react-native';
import { Link } from 'expo-router';

export default function App() { 

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png') // Εικόνα για Web
        : require('../assets/images/top2.png'); // Εικόνα για Expo Go (Mobile)

    const tapGesture = Gesture.Tap()
        .onStart(() => {
            console.log('Tapped!');
        });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={tapGesture}>
                <View style={{ flex: 1, }}>
                
                    <ImageBackground
                                source={require('../assets/images/background-image2.jpg')}
                                style={styles.container} // Στυλ για το ImageBackground
                                resizeMode="cover"
                            >
                                
                                {/* Header Image */}
                                <Image
                                    source={headerImageSource} 
                                    style={styles.headerImage}
                                    resizeMode="contain"
                                />
                                <StatusBar style="auto" />
                        <DragDrop />
                            </ImageBackground>
                    
                    

                </View>
            </GestureDetector>
        </GestureHandlerRootView>

        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#606FB6',
    },

    headerImage: {
        width: '100%', // Κάνει την εικόνα να πιάνει όλο το πλάτος
        height: Platform.OS === 'web' ? 200 : 150, // Ρύθμιση ύψους για Web/Mobile
        marginTop: Platform.OS === 'web' ? 0 : 40, // Προσαρμογή για κινητές συσκευές
        position: 'absolute', // Τοποθέτηση πάνω πάνω
        top: Platform.OS === 'web' ? -60 : -70,
    },

    text: {
        fontSize: Platform.OS === 'web' ? 200 : 80,
        //fontWeight: 'bold',
        color: "white",
        fontFamily: 'BobbyJones'
    },

    text: {
        fontSize: Platform.OS === 'web' ? 200 : 80,
        //fontWeight: 'bold',
        color: "white",
        fontFamily: 'BobbyJones'
    },
    text2: {
        fontSize: Platform.OS === 'web' ? 50 : 20,
        //fontWeight: 'bold',
        color: "white",
        marginBottom: Platform.OS === 'web' ? -70 : -20,
        fontFamily: 'BobbyJones'
    },

});