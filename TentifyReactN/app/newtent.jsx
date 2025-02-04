import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, Image, TouchableOpacity, Pressable, Modal, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
    const router = useRouter();

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png') // Εικόνα για Web
        : require('../assets/images/top2.png'); // Εικόνα για Expo Go (Mobile)

    // Συντεταγμένες κουμπιών
    const buttonData = [
        { id: 1, top: 160, left: 100, text: "Coordinates:\n    -Height: 37.9755 \n    -Width: 23.7345\nHumidity: 23% \nGround Stability: 7,5/10\nSun Coverage: No" },   // Θέση 1
        { id: 2, top: 200, left: 470, text: "Coordinates:\n    -Height: 36.6770 \n    -Width: 25.7338\nHumidity: 27% \nGround Stability: 6/10\nSun Coverage: Yes" },  // Θέση 2
        { id: 3, top: 390, left: 250, text: "Coordinates:\n    -Height: 33.8752 \n    -Width: 24.0362\nHumidity: 34% \nGround Stability: 7/10\nSun Coverage: No" },  // Θέση 3
        { id: 4, top: 480, left: 350, text: "Coordinates:\n    -Height: 33.2765 \n    -Width: 24.6345\nHumidity: 31% \nGround Stability: 8/10\nSun Coverage: No" },  // Θέση 4
        { id: 5, top: 500, left: 470, text: "Coordinates:\n    -Height: 33.0755 \n    -Width: 25.9338\nHumidity: 20% \nGround Stability: 7,5/10\nSun Coverage: Yes" },  // Θέση 5
        { id: 6, top: 580, left: 650, text: "Coordinates:\n    -Height: 32.2755 \n    -Width: 27.5345\nHumidity: 17% \nGround Stability: 9/10\nSun Coverage: Yes" },  // Θέση 6
    ];

    

    const [pressedButtons, setPressedButtons] = useState({});

    const [panelText, setPanelText] = useState('');

    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        // Φόρτωση του αποθηκευμένου κουμπιού κατά το άνοιγμα
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

        // Διαγραφή των αποθηκευμένων δεδομένων όταν γίνεται refresh
        return () => {
            AsyncStorage.removeItem('selectedButton');
            setSelectedButton(null);
        };
    }, []);

    useEffect(() => {
        // Φόρτωση αποθηκευμένων κουμπιών κατά την εκκίνηση
        const loadPressedButtons = async () => {
            try {
                const storedButtons = await AsyncStorage.getItem('pressedButtons');
                if (storedButtons) {
                    setPressedButtons(JSON.parse(storedButtons));
                }
            } catch (error) {
                console.log('Error loading pressed buttons:', error);
            }
        };

        loadPressedButtons();
    }, []);

    useEffect(() => {
        const resetPressedButtons = async () => {
            try {
                await AsyncStorage.removeItem('pressedButtons'); // Διαγραφή αποθηκευμένων κουμπιών
                setPressedButtons({}); // Επαναφορά στο αρχικό state
            } catch (error) {
                console.log('Error resetting pressed buttons:', error);
            }
        };

        resetPressedButtons();
    }, []);

    const handleButtonPress = async (id) => {
        try {
            await AsyncStorage.setItem('selectedButton', JSON.stringify(id));
            setSelectedButton(id);
            const updatedButtons = { ...pressedButtons, [id]: true };
            setPressedButtons(updatedButtons);
            await AsyncStorage.setItem('pressedButtons', JSON.stringify(updatedButtons));
        } catch (error) {
            console.log('Error saving selected button:', error);
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

                    {/* Panel */}
                    <Image
                        source={require('../assets/images/panel.png')}
                        style={styles.panelImage}
                        resizeMode="contain"
                    />
                    {/*Panel Header */}
                    <Text style={styles.panelhdr}>LOCATION'S INFORMATION:</Text>


                    {/* Panel Text */}
                    <Text style={styles.panelText}>{panelText}</Text>

                    
                    {/* Home Button */}
                    <TouchableOpacity
                        onPress={() => router.push('/')}
                        style={[styles.homeButton]}

                    >

                        <Image
                            source={require('../assets/icons/home.png')}
                            style={styles.homeImage}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>



                    {/* Buttons */}
                    {buttonData.map((btn, index) => (
                        <TouchableOpacity
                            key={btn.id}
                            onPress={() => {handleButtonPress(btn.id);
                                            router.push('/stakes')}}
                            style={[styles.buttonWrapper, { top: btn.top, left: btn.left }]}
                            onMouseEnter={() => setPanelText(btn.text)} // Όταν κάνετε hover
                            onMouseLeave={() => setPanelText('')} // Όταν φεύγετε από το κουμπί
                        >
                            <Image
                                source={
                                    pressedButtons[btn.id]
                                        ? require('../assets/images/check.png')
                                        : require('../assets/images/add.png')}
                                style={styles.buttonImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ))}
                    
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
    shelter: {
        top: 270,
        right: -380
    },
    panelhdr: {
        position: 'absolute',
        top: Platform.OS === 'web' ? 140 : 180, // Ρυθμίστε το για να εμφανίζεται πάνω από το panel
        left: Platform.OS === 'web' ? 885 : 50, // Ρυθμίστε την οριζόντια τοποθέτηση
        color: 'white',
        fontSize: 50,
        fontFamily: 'BobbyJones',
        textAlign: 'left',
    },
    panelText: {
        position: 'absolute',
        top: Platform.OS === 'web' ? 250 : 180, // Ρυθμίστε το για να εμφανίζεται πάνω από το panel
        left: Platform.OS === 'web' ? 880 : 50, // Ρυθμίστε την οριζόντια τοποθέτηση
        color: 'white',
        fontSize: 40,
        fontFamily: 'Things',
        textAlign: 'left',
    },
    mapImage: {
        width: Platform.OS === 'web' ? 700 : 350, // Κάνει την εικόνα να πιάνει όλο το πλάτος
        height: Platform.OS === 'web' ? 700 : 350, // Ρύθμιση ύψους για Web/Mobile
        marginTop: Platform.OS === 'web' ? 0 : 40, // Προσαρμογή για κινητές συσκευές
        position: 'absolute', // Τοποθέτηση πάνω πάνω
        top: Platform.OS === 'web' ? 50 : 50,
        marginRight: Platform.OS === 'web' ? 750 : 0
    },
    panelImage: {
        width: Platform.OS === 'web' ? 600 : 350, // Κάνει την εικόνα να πιάνει όλο το πλάτος
        height: Platform.OS === 'web' ? 550 : 350, // Ρύθμιση ύψους για Web/Mobile
        marginTop: Platform.OS === 'web' ? 0 : 40, // Προσαρμογή για κινητές συσκευές
        position: 'absolute', // Τοποθέτηση πάνω πάνω
        top: Platform.OS === 'web' ? 120 : 50,
        marginLeft: Platform.OS === 'web' ? 750 : 0,
        borderRadius: 20
    },
    buttonWrapper: {
        position: 'absolute', // Απαραίτητο για να μπορεί να τοποθετηθεί σε συγκεκριμένες συντεταγμένες
    },
    buttonImage: {
        width: 40, // Μέγεθος κουμπιού
        height: 40,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#626B95',
        borderRadius: 20,
        padding: 20,
        alignSelf: 'center', // Εφαρμόζει αυτόματο πλάτος ανάλογα με το περιεχόμενο
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 0,
    },

    textHeader: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Bobby Jones',
        fontSize: 50, // Μειώστε το μέγεθος για να ταιριάζει καλύτερα
        textAlign: 'center', // Αριστερή στοίχιση
        //marginBottom: 0, // Απόσταση από το επόμενο κείμενο
        top: -40,
        marginRight: 110
    },

    textThings: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Things',
        fontSize: 30,
        textAlign: 'left', // Αριστερή στοίχιση
        lineHeight: 30, // Προσθέτει χώρο ανάμεσα στις γραμμές
    },

    infoButton: {
        position: 'absolute',
        top: 22,
        left: Platform.OS === 'web' ? 1450 : 0,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoButtonImage: {
        width: 40,
        height: 40,
    },

    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        
    },
    modalView: {
        margin: 20,
        backgroundColor: '#626B95',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#404258',
        borderRadius:7,
        
    },
    textStyle: {
        color: 'white',
        //fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "BobbyJones"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    homeButton: {
        position: 'absolute',
        top: Platform.OS === 'web' ? 27 : 50,
        left: Platform.OS === 'web' ? 1400 : 0,
        width: Platform.OS === 'web' ? 30 : 40,
        height: Platform.OS === 'web' ? 30 : 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeImage: {
        width: 30,
        height: 30,
    },

});
