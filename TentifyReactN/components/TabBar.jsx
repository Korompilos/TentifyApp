import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'; 

const TabBar = ({ state, descriptors, navigation }) => {


    // Καθορισμός των routes που θέλουμε να εμφανίζονται
    const visibleRoutes = ['onlinehelp', 'energy', 'cafe', 'weather']; // Προσαρμόστε τα ονόματα
    

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

                    const onPress = () => {
                        // Κατασκευή απλού URL βασισμένου στο όνομα του route
                        const url = `/${route.name}`;
                        window.open(url, '_blank'); // Άνοιγμα σε νέο tab

                       
                    };

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
                            onPress={onPress}
                       
                        >
                            <Text
                                style={styles.tabbarText}
                            >
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
           
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: 'row',
        position: 'absolute',
        top: 13,
        right: -5,
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
        right: 10,
        fontFamily: 'Things',
    },
    tabbarText: {
        color: '#E1E1E1', // Διατηρεί την ίδια εμφάνιση για όλα τα tabs
        fontWeight: 'bold',
    },
});
