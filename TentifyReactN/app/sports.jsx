import { ImageBackground, StyleSheet, Text, View, Platform, Image } from 'react-native'
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const sports = () => {

    const headerImageSource = Platform.OS === 'web'
            ? require('../assets/images/top.png')
            : require('../assets/images/top2.png');



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
                </ImageBackground>
                </SafeAreaView>
                </SafeAreaProvider>
  )
}

export default sports

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#606FB6',
    },
    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',

    },
    headerImage: {
        width: '100%',
        height: Platform.OS === 'web' ? 200 : 150,
        marginTop: Platform.OS === 'web' ? 0 : 40,
        position: 'absolute',
        top: Platform.OS === 'web' ? -60 : -70,
    },
})