import { View, Text, StyleSheet, Button, Switch, Platform, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const energy = () => {
  const [isACOn, setIsACOn] = useState(false); // Κλιματιστικό
  const [isLightsOn, setIsLightsOn] = useState(false); // Φωτισμός
  const [isHeatingOn, setIsHeatingOn] = useState(false); // Θέρμανση
  const [isAppliancesOn, setIsAppliancesOn] = useState(false); // Οικιακές Συσκευές
  const [batteryLevel, setBatteryLevel] = useState(100); // Επίπεδο μπαταρίας (%)
  const [energyConsumption, setEnergyConsumption] = useState(0); // Κατανάλωση (W)

  const [myNumber, setMyNumber] = useState(0); // Αριθμητική μεταβλητή (integer)

  const headerImageSource =
    Platform.OS === 'web'
      ? require('../assets/images/top.png')
      : require('../assets/images/top2.png');

  // Υπολογισμός ενέργειας για κάθε κατηγορία
  const toggleAC = () => {
    setIsACOn((prev) => !prev);
    updateEnergyConsumption(!isACOn ? 30 : -30);
  };

  const toggleLights = () => {
    setIsLightsOn((prev) => !prev);
    updateEnergyConsumption(!isLightsOn ? 20 : -20);
  };

  const toggleHeating = () => {
    setIsHeatingOn((prev) => !prev);
    updateEnergyConsumption(!isHeatingOn ? 50 : -50);
  };

  const toggleAppliances = () => {
    setIsAppliancesOn((prev) => !prev);
    updateEnergyConsumption(!isAppliancesOn ? 35 : -35);
  };

  const updateEnergyConsumption = (change) => {
    setEnergyConsumption((prev) => Math.max(0, prev + change));
  };

  const showAlert = () => {
    window.alert('The battery level is dropping, please close something (for example the AC) to reduce consumption.')
  }

  const showAlert2 = () => {
    window.alert('The battery level is reducing fast, press Reduce Consumption.')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Όταν όλα είναι ανοιχτά, η μπαταρία μειώνεται δραστικά
      if (isACOn && isLightsOn && isHeatingOn && isAppliancesOn) {
        setBatteryLevel((prev) => Math.max(0, prev - 1.9));
      }
      // Όταν είναι ενεργοποιημένα τα 3: Φώτα, Θέρμανση και Συσκευές
      else if (isLightsOn && isHeatingOn && isAppliancesOn) {
        setBatteryLevel((prev) => Math.max(0, prev - 0.6));
      }
      // Όταν είναι ενεργοποιημένα AC, Φώτα και Θέρμανση
      else if (isACOn && isLightsOn && isHeatingOn) {
        setBatteryLevel((prev) => Math.max(0, prev - 0.6));
      }
      // Όταν είναι ενεργοποιημένα μόνο AC και Φώτα
      else if (isACOn && isLightsOn) {
        setBatteryLevel((prev) => Math.max(0, prev - 0.2));
      }
      // Όταν είναι ενεργοποιημένα AC και Θέρμανση
      else if (isACOn && isHeatingOn) {
        setBatteryLevel((prev) => Math.max(0, prev - 0.2));
      }
      // Όταν είναι ενεργοποιημένα AC και Συσκευές
      else if (isACOn && isAppliancesOn) {
        setBatteryLevel((prev) => Math.max(0, prev - 0.2));
      }
      // Όταν όλα είναι κλειστά, η μπαταρία φορτίζει σταδιακά
      else if (!isACOn && !isLightsOn && !isHeatingOn && !isAppliancesOn) {
        setBatteryLevel((prev) => Math.min(100, prev + 1.5));
      }
      // Ανάλογα με την κατανάλωση, η μπαταρία μειώνεται σταδιακά
      else {
        setBatteryLevel((prev) => Math.max(0, prev - energyConsumption / 100));
      }

      
    }, 1000); // Ενημέρωση κάθε δευτερόλεπτο

    return () => clearInterval(interval);
  }, [isACOn, isLightsOn, isHeatingOn, isAppliancesOn, energyConsumption]);

  if (batteryLevel < 39 & myNumber === 0) {
    setMyNumber(prev => prev + 1);
    showAlert();
  }

  if (batteryLevel < 24 & myNumber === 1) {
    setMyNumber(prev => prev + 1);
    showAlert();
  }

  if (batteryLevel < 11 & myNumber === 2) {
    setMyNumber(prev => prev + 1);
    showAlert2();
  }

  if (batteryLevel < 5) {
    if (isLightsOn) toggleLights();
    if (isACOn) toggleAC();
    if (isHeatingOn) toggleHeating();
    if (isAppliancesOn) toggleAppliances();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/images/background-image2.jpg')}
          style={styles.container}
          resizeMode="cover"
        >
          {/* Header Image */}
          <Image
            source={headerImageSource}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <View style={styles.cont}>
            <Text style={styles.title}>Energy Management System</Text>
            <Text style={styles.info}>Battery Level: {batteryLevel.toFixed(1)}%</Text>
            <Text style={styles.info}>Energy Consumption: {energyConsumption} W</Text>

            <View style={styles.control}>
              <Text style={styles.acbt}>AC: {isACOn ? 'ON' : 'OFF'}</Text>
              <Switch value={isACOn} onValueChange={toggleAC} />
            </View>

            <View style={styles.control}>
              <Text style={styles.acbt}>Lighting: {isLightsOn ? 'ON' : 'OFF'}</Text>
              <Switch value={isLightsOn} onValueChange={toggleLights} />
            </View>

            <View style={styles.control}>
              <Text style={styles.acbt}>Heating: {isHeatingOn ? 'ON' : 'OFF'}</Text>
              <Switch value={isHeatingOn} onValueChange={toggleHeating} />
            </View>

            <View style={styles.control}>
              <Text style={styles.acbt}>Appliances: {isAppliancesOn ? 'ON' : 'OFF'}</Text>
              <Switch value={isAppliancesOn} onValueChange={toggleAppliances} />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="REDUCE CONSUMPTION"
                onPress={() => {
                  if (batteryLevel < 25) {
                    if (isLightsOn) toggleLights();
                    if (isACOn) toggleAC();
                    if (isHeatingOn) toggleHeating();
                    if (isAppliancesOn) toggleAppliances();
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
    top: 120,
    borderRadius: 10,
  },
  acbt: {
    fontFamily: 'Things',
    color: 'white',
    fontSize: 30,
  },
  title: {
    fontSize: 22,
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
    marginRight: 750,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default energy;
