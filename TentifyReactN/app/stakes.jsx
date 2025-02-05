import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, ImageBackground, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';

export default function App() {
    const [stakes, setStakes] = useState([
        { id: 1, angle: 0, pressure: 75 },
        { id: 2, angle: 0, pressure: 75 },
        { id: 3, angle: 0, pressure: 75 },
        { id: 4, angle: 0, pressure: 75 },
        { id: 5, angle: 0, pressure: 75 },
        { id: 6, angle: 0, pressure: 75 },
    ]);

    const router = useRouter();

    const updateStake = (id, field, value) => {
        setStakes((prevStakes) =>
            prevStakes.map((stake) =>
                stake.id === id ? { ...stake, [field]: value } : stake
            )
        );
    };

    const groupedStakes = [];
    for (let i = 0; i < stakes.length; i += 3) {
        groupedStakes.push(stakes.slice(i, i + 3));
    }

    const showAlert = () => {
        window.alert('Your Tent has been successfully set up! Move on to the protective cover placement and lighting selection');
    }

    const [myNumber, setMyNumber] = useState(0); // Αριθμητική μεταβλητή (integer)

    const headerImageSource = Platform.OS === 'web'
        ? require('../assets/images/top.png')
        : require('../assets/images/top2.png');

    const handleNext = () => {
        const conditionMet = stakes.some(
            (stake) =>
                (stake.angle > 16 && stake.angle < 164) || stake.pressure < 70
        );

        if (conditionMet) {
            window.alert(
                "At least one stake has an angle between 15° and 165° or a pressure below 70%. \nTo continue, you should adjust the angle between 0-15° & 165-180° and put the pressure over 75%!",
                [{ text: "OK" }]
            );
        } else {
            if (myNumber === 0) {
                setMyNumber(prev => prev + 1);
                showAlert();
                
            }
            router.push("/covers"); // Μετακίνηση στη νέα οθόνη αν όλα είναι σωστά
        }
    };

    return (
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

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Image
                    source={require('../assets/images/nxt.png')}
                    style={styles.nxtbtn}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Stake Adjustment</Text>
                {groupedStakes.map((group, index) => (
                    <View key={index} style={styles.row}>
                        {group.map((stake) => (
                            <View key={stake.id} style={styles.stakeControl}>
                                <Text style={styles.label}>Stake {stake.id}</Text>
                                <Text style={styles.angletxt}>Angle: {Math.round(stake.angle)}°</Text>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={180}
                                    value={stake.angle}
                                    onValueChange={(value) =>
                                        updateStake(stake.id, 'angle', value)
                                    }
                                />
                                <Text style={styles.pressuretxt}>Pressure: {Math.round(stake.pressure)}%</Text>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={100}
                                    value={stake.pressure}
                                    onValueChange={(value) =>
                                        updateStake(stake.id, 'pressure', value)
                                    }
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    headerImage: {
        width: '100%',
        height: Platform.OS === 'web' ? 200 : 150,
        marginTop: Platform.OS === 'web' ? 0 : 40,
        position: 'absolute',
        top: Platform.OS === 'web' ? -60 : -70,
    },
    nxtbtn: {
        width: 30,
        height: 30,
        top: 650,
        marginLeft: 1450,
    },
    title: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'BobbyJones',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stakeControl: {
        flex: 1,
        marginHorizontal: 5,
        padding: 15,
        width: 400,
        borderRadius: 10,
        backgroundColor: '#606FB6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'Things',
        color: 'white',
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 10,
    },
    angletxt: {
        color: 'white',
        fontFamily: 'Things',
        fontSize: 20,
    },
    pressuretxt: {
        color: 'white',
        fontFamily: 'Things',
        fontSize: 20,
    },
});
