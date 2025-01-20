import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const CustomProvider = ({ children }) => {
    const [fontsLoaded] = useFonts({
        "BobbyJones": require('../assets/fonts/BobbyJones.otf'),
        "Things": require('../assets/fonts/things.otf'),
    });

    if (!fontsLoaded) {
        return null; // Περιμένετε τη φόρτωση των γραμματοσειρών
    }

    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'BobbyJones',
        fontFamily: 'Things',
    },
});

export default CustomProvider;
