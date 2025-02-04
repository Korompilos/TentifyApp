import React, { useState } from 'react';
import {View, Image,StyleSheet,ImageBackground,Platform, TouchableOpacity, Text} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';


export default function App() {

    const router = useRouter();

    const [tentImageSource, setTentImageSource] = useState(require('../assets/images/tent.png')); // Default image

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png')
        : require('../assets/images/top2.png');

    const changeTentImage = (image) => {
        setTentImageSource(image);
    };
    
    const nextpage = () => {
        router.push("/lights");
    }

    return (
        <SafeAreaProvider style={styles.centeredView}>
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

            <Image
                        source={tentImageSource}
                style={styles.tentImage}
                resizeMode="cover"
            />

            {/* Button with Image Background */}
            <TouchableOpacity 
            style={styles.button}
            onPress={() => changeTentImage(require('../assets/images/tent1.png'))}>
                 <ImageBackground
                    source={require('../assets/images/btn2.png')}
                    style={styles.buttonBackground}
                    imageStyle={{ borderRadius: 10 }}
                                >
                            <Text style={styles.buttonText}>NORMAL COVER</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
                        onPress={() => changeTentImage(require('../assets/images/tent2.png'))}>
                <ImageBackground
                    source={require('../assets/images/btn2.png')}
                    style={styles.buttonBackground}
                    imageStyle={{ borderRadius: 10 }}
                >
                            <Text style={styles.buttonText}>WINDPROOF COVER</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                        onPress={() => changeTentImage(require('../assets/images/tent3.png'))}>
                <ImageBackground
                    source={require('../assets/images/btn2.png')}
                    style={styles.buttonBackground}
                    imageStyle={{ borderRadius: 10 }}
                >
                            <Text style={styles.buttonText}>WATERPROOF COVER</Text>
                </ImageBackground>
            </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => changeTentImage(require('../assets/images/tent.png'))}>
                        <ImageBackground
                            source={require('../assets/images/btn2.png')}
                            style={styles.buttonBackground}
                            imageStyle={{ borderRadius: 10 }}
                        >
                        <Text style={styles.buttonText}>NO COVER</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={nextpage}>

                        <Image
                            source={require('../assets/images/nxt.png')}
                            style={styles.nxtbtn}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
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
    },
    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',

    },
    nxtbtn: {
        width: 30,
        height: 30,
        top: 10,
        marginLeft: 600,
        zIndex: 10,
    },
    headerImage: {
        width: '100%',
        height: Platform.OS === 'web' ? 200 : 150,
        marginTop: Platform.OS === 'web' ? 0 : 40,
        position: 'absolute',
        top: Platform.OS === 'web' ? -60 : -70,
    },
    tentImage: {
        
        top: -50,
        marginLeft: -600,
    },
    button: {
        top: -550,
        marginRight: -850,
        borderRadius: 10,
        marginBottom: 20,
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
});
