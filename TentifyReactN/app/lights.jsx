import { StyleSheet, Text, View, Platform, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {  useEffect } from 'react';
import Slider from '@react-native-community/slider';
import tinycolor from 'tinycolor2'; // Εισαγωγή της βιβλιοθήκης
import { useRouter } from 'expo-router';


const lights = () => {
    const [currentScreen, setCurrentScreen] = useState('Home');
    const [selectedCategory, setSelectedCategory] = useState(null);


    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png')
        : require('../assets/images/top2.png');

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
    
        //const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Αρχικό χρώμα
        const [brightness, setBrightness] = useState(1); // Αρχική τιμή φωτεινότητας
        const [contrast, setContrast] = useState(1); // Αρχική τιμή αντίθεση
    
        useEffect(() => {
            setAdjustedColor(modifyColor(selectedColor));
        }, [selectedColor, brightness, contrast]);

    const [fxImageSource, setFXSource] = useState(require('../assets/images/panel0.png')); // Default image
    const [btnImageSource, setbtnSource] = useState(require('../assets/images/btn3.png')); // Default image
    const [btnImageSource2, setbtnSource2] = useState(require('../assets/images/btn4.png')); // Default image
    const [btnImageSource3, setbtnSource3] = useState(require('../assets/images/btn5.png')); // Default image

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

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Home':
                return (
                    <SafeAreaView>
                        <ImageBackground
                            source={require('../assets/images/background-image2.jpg')}
                            style={styles.container}
                            resizeMode="cover"
                        >
                            <Image
                                source={headerImageSource}
                                style={styles.headerImage}
                                resizeMode="contain"
                            />
                            <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonn}
                                onPress={() => {
                                    setCurrentScreen('Coloured Lighting Effects');
                                }}
                            >
                                <Text style={styles.buttonTextn}>Coloured Lighting Effects</Text>
                            </TouchableOpacity>
                    
                                <TouchableOpacity
                                    style={styles.buttonn}
                                    onPress={() => {
                                        setCurrentScreen('Premade Lighting Effects');
                                    }}
                                >
                                <Text style={styles.buttonTextn}>Premade Lighting Effects</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </SafeAreaView>
                );

            case 'Coloured Lighting Effects':
                return (
                    <SafeAreaView>
                        <ImageBackground
                            source={require('../assets/images/background-image2.jpg')}
                            style={styles.container}
                            resizeMode="cover"
                        >
                            <Image
                                source={headerImageSource}
                                style={styles.headerImage}
                                resizeMode="contain"
                            />

                            <View style={styles.buttonContainer2}>
                                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Home')}>
                                    <Image source={require('../assets/images/bck.png')} />
                                   
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navButton} onPress={() => {if (selectedColor !== '#FFFFFF') {
                                    router.push("/newtent"); // Μεταφέρεται στη σελίδα μόνο αν έχει επιλεγεί χρώμα διαφορετικό από λευκό
                                }
                                }}>
                                    <Image source={require('../assets/images/nxt.png')} />
                                   
                                </TouchableOpacity>
                            </View>

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

                                   
                                        <StatusBar style="auto" />

                        </ImageBackground>
                    </SafeAreaView>
                );
            
            case 'Premade Lighting Effects':
                return (
                    <SafeAreaView>
                        <ImageBackground
                            source={require('../assets/images/background-image2.jpg')}
                            style={styles.container}
                            resizeMode="cover"
                        >
                            <Image
                                source={headerImageSource}
                                style={styles.headerImage}
                                resizeMode="contain"
                            />

                            <View style={styles.buttonContainer2}>
                                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Home')}>
                                    <Image source={require('../assets/images/bck.png')} />

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navButton} onPress={() => router.push("/newtent")}>
                                    <Image source={require('../assets/images/nxt.png')} />

                                </TouchableOpacity>
                            </View>

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
                                                    style={styles.buttonm}
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
                                                                    <Text style={styles.buttonTextm}>NIGHT MODE</Text>
                                                        </ImageBackground>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                    style={styles.buttonm}
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
                                                                    <Text style={styles.buttonTextm}>PARTY MODE</Text>
                                                        </ImageBackground>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.buttonm}
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
                                                                    <Text style={styles.buttonTextm}>CHILL MODE</Text>
                                                        </ImageBackground>
                                                    </TouchableOpacity>

                            
                            <StatusBar style="auto" />

                        </ImageBackground>
                    </SafeAreaView>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaProvider>
            {renderScreen()}
        </SafeAreaProvider>
    );
};

export default lights;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer2: {
        marginTop: 40, // Σπρώχνει τα κουμπιά πιο κάτω
        flexDirection: 'row', // Τα κάνει να μπαίνουν δίπλα-δίπλα
        justifyContent: 'center', // Κεντράρει οριζόντια
        top: 600,
        left: 700,
        zIndex:10
    },

    buttonContainer: {
        marginTop: 40, // Σπρώχνει τα κουμπιά πιο κάτω
        flexDirection: 'column', 
        justifyContent: 'center', // Κεντράρει οριζόντια
        width: 1500,
        left: 150,
        top: 200
    },
    chat: {
        top: 100,
        width: '60%'
    },
    navButton: {
        //backgroundColor: '#606FB6',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginHorizontal: 0, // Δίνει απόσταση μεταξύ των κουμπιών
        zIndex: 10
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerImage: {
        width: '100%',
        height: Platform.OS === 'web' ? 200 : 150,
        marginTop: Platform.OS === 'web' ? 0 : 40,
        position: 'absolute',
        top: Platform.OS === 'web' ? -60 : -70,
    },
    btns: {
        backgroundColor: '#606FB6',
        borderRadius: 15,
    },
    content: {
        marginTop: 150,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 44,
        fontFamily: 'Things',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
        top: 0
    },
    title2: {
        fontSize: 44,
        fontFamily: 'Things',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
        top: 100
    },
    buttonn: {
        padding: 15,
        backgroundColor: '#606FB6',
        marginVertical: 10,

        borderRadius: 5,
        width: '80%',
    },
    buttonTextn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Things',
    },
    menuItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 5, // Για να μην κολλάνε στις άκρες
        minWidth: '45%', // Για να έχουν παρόμοιο πλάτος
    },
    itemText: {
        fontSize: 18,
        color: 'white',
        flex: 1, // Για σωστή στοίχιση
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#606FB6',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    status: {
        marginTop: 20,
        fontSize: 28,
        fontFamily: 'Things',
        textAlign: 'center',
        color: 'white',
    },
    row: {
        flex: 1,
        justifyContent: 'space-around', // Δημιουργεί χώρο ανάμεσα στις στήλες
        marginBottom: 10,
    },

    sliderText: {
        fontSize: 18,
        color: '#FFFFFF',
        //marginTop: 10,
        top: -520,
        marginLeft: 650,
        fontFamily: "BobbyJones"
    },

    slider: {
        width: 300,
        height: 70,
        marginVertical: 5,
        top: -520,
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
        top: 7,
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
        top: -570,
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

    ourfxImage: {
        marginRight: 900,
        top: -520
    },

    buttonm: {
        top: -900,
        marginRight: 910,
        borderRadius: 10,
        marginBottom: 20
    },
    buttonBackground: {
        width: Platform.OS === 'web' ? 300 : 100,
        height: Platform.OS === 'web' ? 100 : 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextm: {
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
        top: 20,
        marginRight: -470
    },
    backButton: {
        position: 'absolute',
        left: -50,
        top: 0,
        padding: 10,
        //backgroundColor: 'black'
    },
});
