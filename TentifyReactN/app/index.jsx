import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Platform, Button, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ImageBackground } from 'react-native';


export default function App() {
    return (
        <ImageBackground
            source={require('../assets/images/background-image.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.textWrapper}>
                {/* Welcome To */}
                <Text style={styles.text2}>WELCOME TO</Text>

                {/* TENTIFY με σκιά */}
                <View style={styles.textGroup}>
                    {/* Σκιά */}
                    <Text style={[styles.text, styles.shadowText]}>TENTIFY.</Text>
                    {/* Κύριο Κείμενο */}
                    <Text style={styles.text}>TENTIFY.</Text>
                </View>

                {/* Button with Image Background */}
                <TouchableOpacity style={styles.button}>
                    <ImageBackground
                        source={require('../assets/images/btn.png')}
                        style={styles.buttonBackground}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        <Link href="/newtent" style={styles.buttonText}>
                            Start
                        </Link>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
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
    textWrapper: {
        alignItems: 'center', // Ευθυγράμμιση στο κέντρο
        justifyContent: 'center',
    },
    text2: {
        fontSize: Platform.OS === 'web' ? 50 : 30,
        color: "white",
        marginBottom: 20, // Απόσταση από το TENTIFY
        fontFamily: 'BobbyJones',
        textAlign: 'center',
        marginBottom: Platform.OS === 'web' ? -45 : -25
    },
    textGroup: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Σχετική τοποθέτηση για σκιά + κείμενο
        marginBottom: 0, // Απόσταση από το Start
    },
    text: {
        fontSize: Platform.OS === 'web' ? 200 : 100,
        color: "white",
        fontFamily: 'BobbyJones',
        textAlign: 'center',
    },
    shadowText: {
        fontSize: Platform.OS === 'web' ? 200 : 100,
        color: "#2F303E", // Χρώμα σκιάς
        position: 'absolute', // Σχετική τοποθέτηση για τη σκιά
        top: Platform.OS === 'web' ?  7 : 5, // Μικρή μετατόπιση
        left: Platform.OS === 'web' ?  7 : 5,
    },
    button: {
        marginTop: -10,
        borderRadius: 10,
    },
    buttonBackground: {
        width: Platform.OS === 'web' ? 150 : 100,
        height: Platform.OS === 'web' ? 60 : 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: Platform.OS === 'web' ?  30 : 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: "BobbyJones"
    },
});
