import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { ImageBackground } from 'react-native';
import { useState } from 'react';

 

export default function App() {

    const [fxImageSource, setFXSource] = useState(require('../assets/images/panel0.png')); // Default image
    const [btnImageSource, setbtnSource] = useState(require('../assets/images/btn3.png')); // Default image
    const [btnImageSource2, setbtnSource2] = useState(require('../assets/images/btn4.png')); // Default image
    const [btnImageSource3, setbtnSource3] = useState(require('../assets/images/btn5.png')); // Default image

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png') // Εικόνα για Web
        : require('../assets/images/top2.png'); // Εικόνα για Expo Go (Mobile)

    const changeFXImage = (image) => {
        setFXSource(image);
    };

    const btnImage = (image) => {
        setbtnSource(image);
    };

    const btnImage2 = (image) => {
        setbtnSource2(image);
    };

    const btnImage3 = (image) => {
        setbtnSource3(image);
    };

    return (
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

            <Image
                source={fxImageSource}
                style={styles.fxImage}
                resizeMode="contain"
            />

            <Image
                source={require('../assets/images/ourfx.png')}
                style={styles.ourfxImage}
                resizeMode="contain"
            />

            {/* Button with Image Background */}
                        <TouchableOpacity 
                        style={styles.button}
                onPress={() => {
                    changeFXImage(require('../assets/images/panel1.png'));
                    btnImage2(require('../assets/images/btn6.png'));
                    btnImage3(require('../assets/images/btn6.png'));
                    btnImage(require('../assets/images/btn3.png'));
                }}>
                             <ImageBackground
                                source={btnImageSource}
                                style={styles.buttonBackground}
                                imageStyle={{ borderRadius: 10 }}
                                            >
                                        <Text style={styles.buttonText}>NIGHT MODE</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.button}
                onPress={() => {
                    changeFXImage(require('../assets/images/panel2.png'));
                    btnImage2(require('../assets/images/btn3.png'));
                    btnImage(require('../assets/images/btn6.png'));
                    btnImage3(require('../assets/images/btn6.png'));
                }}>
                            <ImageBackground
                                source={btnImageSource2}
                                style={styles.buttonBackground}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                        <Text style={styles.buttonText}>PARTY MODE</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                onPress={() => {
                    changeFXImage(require('../assets/images/panel3.png'));
                    btnImage2(require('../assets/images/btn6.png'));
                    btnImage(require('../assets/images/btn6.png'));
                    btnImage3(require('../assets/images/btn3.png'));
                }}>
                            <ImageBackground
                                source={btnImageSource3}
                                style={styles.buttonBackground}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                        <Text style={styles.buttonText}>CHILL MODE</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        
            

            
            <StatusBar style="auto" />
        </ImageBackground>
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

    ourfxImage: {
        marginRight: 950,
        top: -60
    },

    button: {
        top: -440,
        marginRight: 952,
        borderRadius: 10,
        marginBottom: 20
    },
    buttonBackground: {
        width: Platform.OS === 'web' ? 300 : 100,
        height: Platform.OS === 'web' ? 100 : 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: Platform.OS === 'web' ? 30 : 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: "BobbyJones"
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

    fxImage: {
        
        top: 480,
        marginRight: -550
    }
   
});