import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Platform, Image, TouchableOpacity, Pressable, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import tinycolor from 'tinycolor2'; // Εισαγωγή της βιβλιοθήκης
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function App() {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Αρχικό χρώμα
    const [adjustedColor, setAdjustedColor] = useState('#FFFFFF');

    const colors = ['#D22929', '#7B1C1C', '#FFA44F', '#E47915', '#FFFF33', '#A6A660', '#55D422', '#217300', '#70CFFF', '#2897CF', '#5645AE', '#1A0F52', '#EB88FF', '#FF33FF', '#9E1ABB', '#560256']; // Παλέτα χρωμάτων

    // Συνάρτηση που υπολογίζει το νέο χρώμα με βάση την φωτεινότητα και αντίθεση
    const modifyColor = (color) => {
        return tinycolor(color)
            .lighten((brightness - 1) * 100) // Προσαρμογή φωτεινότητας
            .saturate((contrast - 1) * 100) // Προσαρμογή αντίθεσης
            .toString();
    };

    const router = useRouter();

    const nextpage = () => {
        router.push("/onlinehelp");
    }

    const lightpage2 = () => {
        router.push("/lighting2");
    }

    //const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Αρχικό χρώμα
    const [brightness, setBrightness] = useState(1); // Αρχική τιμή φωτεινότητας
    const [contrast, setContrast] = useState(1); // Αρχική τιμή αντίθεση

    useEffect(() => {
        setAdjustedColor(modifyColor(selectedColor));
    }, [selectedColor, brightness, contrast]);

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png') // Εικόνα για Web
        : require('../assets/images/top2.png'); // Εικόνα για Expo Go (Mobile)

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


            {/* Color Panel */}
            <View style={[styles.colorPanel, { backgroundColor: modifyColor(selectedColor) }]}>
                <Text style={styles.colorText}>Selected Color: {selectedColor}</Text>
            </View>



            {/* Color Palette */}
            <View style={styles.palette}>
                {colors.slice(0, 4).map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.colorButton, { backgroundColor: color }]}
                        onPress={() => setSelectedColor(color)}
                    />
                ))}
            </View>

            <View style={styles.palette}>
                {colors.slice(4, 8).map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.colorButton, { backgroundColor: color }]}
                        onPress={() => setSelectedColor(color)}
                    />
                ))}
            </View>
                <View style={styles.palette}>
                    {colors.slice(8, 12).map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.colorButton, { backgroundColor: color }]}
                            onPress={() => setSelectedColor(color)}
                        />
                    ))}
                </View>

                <View style={styles.palette}>
                    {colors.slice(12, 16).map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.colorButton, { backgroundColor: color }]}
                            onPress={() => setSelectedColor(color)}
                        />
                    ))}
                </View>

            {/* Brightness Slider */}
            <Text style={styles.sliderText}>Brightness: {Math.round(brightness * 100)}%</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0.5}
                    maximumValue={1.5}
                    step={0.01}
                    value={brightness}
                        onValueChange={setBrightness}
                />

            {/* Contrast Slider */}
            <Text style={styles.sliderText}>Contrast: {Math.round(contrast * 100)}%</Text>
                <Slider
                    style={styles.slider}
                        minimumValue={0.5}
                        maximumValue={1.5}
                    step={0.01}
                    value={contrast}
                        onValueChange={setContrast}
                />
                
                    <TouchableOpacity onPress={() => {
                        if (selectedColor !== '#FFFFFF') {
                            nextpage(); // Μεταφέρεται στη σελίδα μόνο αν έχει επιλεγεί χρώμα διαφορετικό από λευκό
                        }
                    }}
                        disabled={selectedColor === '#FFFFFF'}>
                <Image
                    source={require('../assets/images/nxt.png')}
                    style={styles.nxtbtn}
                    resizeMode="contain"
                />
            </TouchableOpacity>

                    <TouchableOpacity onPress={lightpage2}
                        >
                        <Image
                            source={require('../assets/images/nxt2.png')}
                            style={styles.nxtbtn2}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

            <StatusBar style="auto" />
        </ImageBackground>
                    </SafeAreaView>
        </SafeAreaProvider>
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
        width: '100%',
        height: Platform.OS === 'web' ? 200 : 150,
        marginTop: Platform.OS === 'web' ? 0 : 40,
        position: 'absolute',
        top: Platform.OS === 'web' ? -60 : -70,
    },

    nxtbtn: {
        width: 30,
        height: 30,
        top: -185,
        marginLeft: 1450
    },

    nxtbtn2: {
        width: 80,
        height: 80,
        top: -240,
        marginLeft: 1300
    },

    sliderText: {
        fontSize: 18,
        color: '#FFFFFF',
        //marginTop: 10,
        top: -200,
        marginLeft: 650,
        fontFamily: "BobbyJones"
    },

    slider: {
        width: 300,
        height: 70,
        marginVertical: 5,
        top: -200,
        marginLeft: 650,
        zIndex: 10,
    },

    textThings: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Things',
        fontSize: 30,
        textAlign: "left",
        //fontStyle: 'normal',
        //fontWeight: '400',
        //lineHeight: 30,
        //top: Platform.OS === 'web' ? 0 : 50,
        //marginRight: Platform.OS === 'web' ? -540 : 0
    },

    colorPanel: {
        width: 800,
        height: 550,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: -600, // Πάνελ αριστερά
        top: 330,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },

    colorText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    textHeader: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Bobby Jones',
        fontSize: 50,
        textAlign: "left"
        //fontStyle: 'normal',
        //fontWeight: '400',
        //lineHeight: 50,
        //top: Platform.OS === 'web' ? -50 : 50,
        //marginRight: Platform.OS === 'web' ? -600 : 0
    },
    
    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        //fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "BobbyJones"
    },

    palette: {
        //width: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        //marginBottom: 0,
        top: -250,
        marginLeft: 650, // Παλέτα δεξιά του πάνελ
        
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
});
