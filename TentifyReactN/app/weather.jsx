import { StyleSheet, Text, View, Platform, Image } from 'react-native'
import React from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';

const weather = () => {
    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png') // Εικόνα για Web
        : require('../assets/images/top2.png'); // Εικόνα για Expo Go (Mobile)

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ImageBackground
                    source={require('../assets/images/background-image2.jpg')}
                    style={styles.container}
                    resizeMode="cover">

                    {/* Header Image */}
                    <Image
                        source={headerImageSource}
                        style={styles.headerImage}
                        resizeMode="contain"
                    />
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default weather

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
    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',

    },
    
})