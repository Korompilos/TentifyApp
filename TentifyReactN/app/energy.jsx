import { View, Text, StyleSheet, Button, Switch, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const energy = () => {

  const [isACOn, setIsACOn] = useState(false); // Κλιματιστικό
  const [isLightsOn, setIsLightsOn] = useState(true); // Φωτισμός
  const [batteryLevel, setBatteryLevel] = useState(75); // Επίπεδο μπαταρίας (%)
  const [energyConsumption, setEnergyConsumption] = useState(20); // Κατανάλωση (W)

  const headerImageSource = Platform.OS === 'web'
          ? require('../assets/images/top.png')
          : require('../assets/images/top2.png');

  const toggleAC = () => {
    setIsACOn((prev) => !prev);
    updateEnergyConsumption(!isACOn ? 15 : -15); // Υπολογισμός ενέργειας για το A/C
    updatebatterylevel(!isACOn ? 10 : -10);
  };

  const toggleLights = () => {
    setIsLightsOn((prev) => !prev);
    updateEnergyConsumption(!isLightsOn ? 10 : -10); // Υπολογισμός ενέργειας για τα φώτα
    updatebatterylevel(!isLightsOn ? 10 : -10);
  };

  const updateEnergyConsumption = (change) => {
    setEnergyConsumption((prev) => Math.max(0, prev + change));
    setBatteryLevel((prev) => Math.max(0, prev - change / 2));
  };

  const updatebatterylevel = (change) => {
    setEnergyConsumption((prev) => Math.max(0, prev + change));
    setBatteryLevel((prev) => Math.max(0, prev - change / 2));
  };

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
          <View style={styles.cont}>
            <Text style={styles.title}>Energy Management System</Text>
            <Text style={styles.info}>Battery Level: {batteryLevel}%</Text>
            <Text style={styles.info}>Energy Consumption: {energyConsumption} W</Text>

            <View style={styles.control}>
              <Text style={styles.acbt}>AC: {isACOn ? 'ON' : 'OFF'}</Text>
              <Switch value={isACOn} onValueChange={toggleAC} />
            </View>

            <View style={styles.control}>
              <Text style={styles.acbt}>Lighting: {isLightsOn ? 'ON' : 'OFF'}</Text>
              <Switch value={isLightsOn} onValueChange={toggleLights} />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="REDUCE CONSUMPTION"
                onPress={() => {
                  if (batteryLevel < 20) {
                    toggleLights(); // Απενεργοποίηση φωτισμού αν η μπαταρία είναι χαμηλή
                  }
                }}
                color="#ff6347"
              />
            </View>
          </View>
          </ImageBackground>
            </SafeAreaView>
          </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606FB6',
  },
  cont: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#606FB6',
    width: 1000,
    top: 150,
    borderRadius: 10,
  },
  acbt: {
    fontFamily: 'Things',
    color: 'white',
    fontSize: 30,
  },

  title: {
    fontSize: 22,
    //fontWeight: 'bold',
    fontFamily: 'Things',
    color: 'white',
    fontSize: 70,
    marginBottom: 20,
    textAlign: 'center',
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
  info: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
    fontFamily: 'Things',
    color: 'white',
    fontSize: 30,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    marginRight: 750
    
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default energy;