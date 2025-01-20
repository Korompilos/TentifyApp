import { StyleSheet, Text, View, Image, Platform, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { useState } from 'react';
import { ImageBackground } from 'react-native';

const onlinehelp = () => {
  // Δεδομένα για τα modals
  const modalData = [
    { id: 1, buttonText: 'Location Selection', header: 'SELECT A LOCATION FROM THE MAP TO SET UP YOUR TENT.', content: 'The interactive map will provide you some suggestions on locations that can be suitable for setting up a tent (add points). After hovering your cursor over each of the add points, a pop up will appear, with useful info on the ground`s stability, the humidity etc. After choosing your desired spot, click on it`s add point so you can on to the stakes` placement.' },
    { id: 2, buttonText: 'Stakes` adjustment', header: 'ADJUST THE ANGLE AND THE PRESSURE OF THE STAKES.', content: 'After choosing the location to set up your tent, you have to adjust the angle and the pressure of each stake that ``support`` the tent (6). \nEach stakes` angle should be lower than 15° and higher than 165° and the pressure of each one must be over 75%, to ensure the tent`s stability.\nIf at least one stake`s angle or pressure (or both) is not as it should, an alert message will appear on top of the screen, informing you about the error. ' },
    { id: 3, buttonText: 'Covers Selection', header: 'SELECT THE PROTECTIVE COVER FOR YOUR TENT.', content: 'The next step is to choose the protective cover you will place on top of your tent. You will be given 3 choices (normal, windproof, waterproof) but also the choice to not use a cover. The app will provide an alert message, informing you about the weather conditions and recommend to you the most suitable cover.' },
    { id: 4, buttonText: 'Lighting & FX', header: 'SELECT A COLOR OR A PRE-MADE EFFECT FOR YOUR TENT`S LIGHTING.', content: 'Pick your desired color from the palette and modify its brightness and contrast as you wish! In the panel on the left you will see real-time how the lighting will be. On the other hand, you can also choose to use one of our premade effects, although you will not be able to modify them (brightness, contrast). \n \n You are not able to use a premade effect and a coloured lighting! Choose only one of the options!' },
    { id: 5, buttonText: 'Energy Management', header: 'Header 5', content: 'This is content for modal 5' },
    { id: 6, buttonText: '678', header: 'Header 6', content: 'This is content for modal 6' },
    { id: 7, buttonText: '789', header: 'Header 7', content: 'This is content for modal 7' },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const openModal = (modal) => {
    setCurrentModal(modal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentModal(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <ImageBackground
          source={require('../assets/images/background-image2.jpg')}
          style={styles.container}
          resizeMode="cover"
        >
          <Image
            source={Platform.OS === 'web'
              ? require('../assets/images/top.png')
              : require('../assets/images/top2.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />

          <Text style={styles.Texthdr}> Need Help? You are at the right place!</Text>
          <Text style={styles.text}>
            Select the category you need help with and by clicking on it, a pop-up message will be
            shown to provide you valuable information!
          </Text>

          <View style={styles.buttonContainer}>
            {modalData.map((modal) => (
              <Pressable
                key={modal.id}
                onPress={() => openModal(modal)}
                style={styles.infoButton}
              >
                <Text style={styles.buttonText}>{modal.buttonText}</Text>
              </Pressable>
            ))}
          </View>
        </ImageBackground>

        {/* Modal */}
        {currentModal && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textHeader}>{currentModal.header}</Text>
                <Text style={styles.textThings}>{currentModal.content}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={closeModal}
                >
                  <Text style={styles.textStyle}>CLOSE</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default onlinehelp;

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
  Texthdr: {
    fontFamily: 'BobbyJones',
    color: 'white',
    alignContent: 'center',
    fontSize: 75,
    top: -140,
  },
  text: {
    fontFamily: 'Things',
    color: 'white',
    alignContent: 'center',
    fontSize: 25,
    top: -140,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#404258',
    borderRadius: 7,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#626B95',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'BobbyJones',
  },
  textHeader: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Bobby Jones',
    fontSize: 50,
    textAlign: 'center',
    top: 0,
    marginBottom: 20
  },
  textThings: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Things',
    fontSize: 30,
    textAlign: 'left',
    lineHeight: 30,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row', // Οριζόντια στοίχιση
    flexWrap: 'wrap', // Αν δεν χωράνε, πάνε στην επόμενη σειρά
    justifyContent: 'center', // Κεντράρισμα οριζόντια
    marginTop: 20,
  },
  infoButton: {
    margin: 10, // Απόσταση μεταξύ των κουμπιών
    padding: 10,
    backgroundColor: '#626B95',
    borderRadius: 10,
    width: 150, // Πλάτος κουμπιού
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Things'
  },
});
