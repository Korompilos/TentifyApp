import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState } from 'react'; 
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import shelter from '../app/shelter';

const TabBar = ({ state, descriptors, navigation }) => {

    const nav = useNavigation();

    const icons = {
        onlinehelp: (props) => <Entypo name="help-with-circle" size={24} color="white" {...props} />,
        energy: (props) => <SimpleLineIcons name="energy" size={24} color="white" {...props} />,
        cafe: (props) => <Ionicons name="fast-food" size={24} color="white" {...props} />,
        weather: (props) => <MaterialCommunityIcons name="weather-partly-lightning" size={24} color="white" {...props} />,
        sports: (props) => <MaterialIcons name="sports-handball" size={24} color="white" {...props} />,
        shelter: (props) => <MaterialIcons name="night-shelter" size={24} color="white" {...props} />,
    };

    // Καθορισμός των routes που θέλουμε να εμφανίζονται
    const visibleRoutes = ['onlinehelp', 'energy', 'cafe', 'weather', 'sports', 'shelter']; // Προσαρμόστε τα ονόματα
    
    const [modalVisible, setModalVisible] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null);

    // Αντιστοίχιση αριθμών σε εικόνες
    const imageMap = {
        1: require('../assets/images/weather1.png'),
        2: require('../assets/images/weather2.png'),
        3: require('../assets/images/weather3.png'),
        4: require('../assets/images/weather4.png'),
    };

    const generateRandomNumber = async () => {
        if (randomNumber === null) {
            const newRandomNumber = Math.floor(Math.random() * 4) + 1;
            setRandomNumber(newRandomNumber);
            await AsyncStorage.setItem('weatherRandomNumber', newRandomNumber.toString());
        }
        setModalVisible(true);
    };

    const handleBackPress = () => {
        const backRoutes = {
            stakes: 'newtent',
            //lights: 'covers',
            covers: 'stakes',
            
        };

        const currentRoute = state.routes[state.index].name;

        if (backRoutes[currentRoute]) {
            navigation.navigate(backRoutes[currentRoute]); // Μετάβαση στην προηγούμενη καθορισμένη σελίδα
        } else {
            navigation.goBack(); // Επιστροφή στην προηγούμενη σελίδα αν δεν υπάρχει ορισμένη διαδρομή
        }
    };

    return ( 
        <View style={styles.tabbar}>
            {state.routes[state.index].name !== 'index' && state.routes[state.index].name !== 'lights' &&  state.routes[state.index].name !== 'cafe' && state.routes[state.index].name !== 'energy' && state.routes[state.index].name !== 'onlinehelp' && state.routes[state.index].name !== 'sports' && state.routes[state.index].name !== 'shelter' &&(
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            )}
            {state.routes
                .filter(route => visibleRoutes.includes(route.name)) // Φιλτράρουμε μόνο τα επιθυμητά routes
                .map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    if (['_sitemap', '+not-found'].includes(route.name)) return null;


                    const isFocused = state.index === index;

                    if (state.routes[state.index].name === 'index') {
                        return null; // Δεν επιστρέφουμε τίποτα αν η τρέχουσα σελίδα είναι το index
                    }
                  
                    return (
                        <TouchableOpacity
                            key={route.name}
                            style={styles.tabbarItem}
                            accessibilityRole="button"
                            
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={() => {
                                if (route.name === 'weather') {
                                    generateRandomNumber();
                                } else {
                                    // Κατασκευή απλού URL βασισμένου στο όνομα του route
                                    const url = `/${route.name}`;
                                    window.open(url, '_blank'); // Άνοιγμα σε νέο tab
                                }
                            }}
                       
                        >
                            {icons[route.name] ? (
                                icons[route.name]({
                                    
                                })
                            ) : null}

                            
                        </TouchableOpacity>
                    );
                })}

            {/* Modal για το Weather */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={imageMap[randomNumber || 1]} style={styles.weatherImage} />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
           
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: 'row',
        position: 'absolute',

        top: 20,
        right: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#8FA2FF',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 40,
        borderCurve: 'continuous',
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 25, // Προσθήκη κενού μεταξύ των tabs
        right: 0,
        fontFamily: 'Things',
    },
    tabbarText: {
        color: '#E1E1E1', // Διατηρεί την ίδια εμφάνιση για όλα τα tabs
        fontWeight: 'bold',
    },
    label: {
        color: 'white',
        fontSize: 12,
    },
    backButton: {
        position: 'absolute',
        left: -50,
        top: 0,
        padding: 10,
        //backgroundColor: 'black'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    weatherImage: {
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#606FB6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'BobbyJones'
    },
});
