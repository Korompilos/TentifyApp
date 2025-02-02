import { ImageBackground, StyleSheet, Text, View, Platform, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const sports = () => {

    const headerImageSource = Platform.OS === 'web'
            ? require('../assets/images/top.png')
            : require('../assets/images/top2.png');

    const [activeButtons, setActiveButtons] = useState([false, false, false]);

    const handlePress = (index) => {
        const updatedButtons = [...activeButtons];
        updatedButtons[index] = !updatedButtons[index];
        setActiveButtons(updatedButtons);
    };

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

                  

                  <View style={styles.container2}>

                      <Image
                          source={require('../assets/images/sports.png')}
                          style={styles.img}
                          resizeMode="contain"
                      />
                      {activeButtons.map((isActive, index) => (
                          <TouchableOpacity
                              key={index}
                              style={[styles.button, isActive && styles.activeButton]}
                              onPress={() => handlePress(index)}
                          >
                              <Text style={styles.text}>{isActive ? 'Participated' : 'Participate'}</Text>
                          </TouchableOpacity>
                      ))}
                  </View>

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
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',

    },
    img: {
        width: '60%', 
        top: -110,
        marginLeft: 970
    },
    headerImage: {
        width: '100%',
        height: Platform.OS === 'web' ? 200 : 150,
        marginTop: Platform.OS === 'web' ? 0 : 40,
        position: 'absolute',
        top: Platform.OS === 'web' ? -60 : -70,
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#5F65C5',
        padding: 15,
        width: 290,
        borderRadius: 10,
        marginHorizontal: 15,
        top: 160,
        right: 940
        
    },
    activeButton: {
        backgroundColor: '#60CD84',
    },
    text: {
        color: 'white',
        fontFamily: 'BobbyJones',
        justifyContent: 'center',
        alignItems: 'center',
    },
})