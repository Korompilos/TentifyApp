import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState } from 'react'; 
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabBar = ({ state, descriptors, navigation }) => {

    const icons = {
        onlinehelp: (props) => <Entypo name="help-with-circle" size={24} color="white" {...props} />,
        energy: (props) => <SimpleLineIcons name="energy" size={24} color="white" {...props} />,
        cafe: (props) => <Ionicons name="fast-food" size={24} color="white" {...props} />,
        weather: (props) => <MaterialCommunityIcons name="weather-partly-lightning" size={24} color="white" {...props} />,
    };

    // Καθορισμός των routes που θέλουμε να εμφανίζονται
    const visibleRoutes = ['onlinehelp', 'energy', 'cafe', 'weather']; // Προσαρμόστε τα ονόματα
    
    const [modalVisible, setModalVisible] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null);

    // Αντιστοίχιση αριθμών σε εικόνες
    const imageMap = {
        1: require('../assets/images/weather1.png'),
        2: require('../assets/images/weather2.png'),
        3: require('../assets/images/weather3.png'),
        4: require('../assets/images/weather4.png'),
    };

    const generateRandomNumber = () => {
        if (randomNumber === null) {
            const newRandomNumber = Math.floor(Math.random() * 4) + 1;
            setRandomNumber(newRandomNumber);
        }
        setModalVisible(true);
    };

    return ( 
        <View style={styles.tabbar}>
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
                                    color: isFocused ? 'white' : '#E1E1E1',
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
