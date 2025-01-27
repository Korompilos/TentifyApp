import { StyleSheet, Text, View, Platform, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';

// Sample data
const menuData = {
  'Coffee & Drinks' : [
    { id: '1', name: 'Espresso', price: 2.5 },
    { id: '2', name: 'Cappuccino', price: 3.0 },
    { id: '3', name: 'Greek Coffee', price: 2.5 },
    { id: '4', name: 'Orange Juice', price: 3.0 },
    { id: '5', name: 'Orangade', price: 3.0 },
    { id: '6', name: 'Lemonade', price: 2.5 },
    { id: '7', name: 'Soda', price: 2.5 },
    { id: '8', name: 'Coca Cola', price: 2.5 },
    { id: '9', name: 'Sprite', price: 2.5 },
    { id: '10', name: 'Beer', price: 5.0 },
    { id: '11', name: 'Radler Beer', price: 4.5 },
    { id: '12', name: 'Alcohol Free Beer', price: 4.0 },
    { id: '13', name: 'Whiskey', price: 7.0 },
    { id: '14', name: 'Gin Tonic', price: 7.5 },
    { id: '15', name: 'Vodka', price: 7.5 },
  ],
  Meals: [
    { id: '16', name: 'Chicken Fillet with rice', price: 7.0 },
    { id: '17', name: 'Steak with French Fries', price: 7.5 },
    { id: '18', name: 'French fries', price: 3.0 },
    { id: '19', name: 'Burger with fries', price: 6.0 },
    { id: '20', name: 'Greek Salad', price: 4.0 },
    { id: '21', name: 'Ceasar`s Salad', price: 5.0 },
    { id: '22', name: 'Carbonara', price: 6.5 },
    { id: '23', name: 'Bolongese', price: 6.0 },
  ],
};

const cafe = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Pending');

  const headerImageSource = Platform.OS === 'web'
    ? require('../assets/images/top.png')
    : require('../assets/images/top2.png');

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handlePlaceOrder = () => {
    setOrderStatus('Processing');
    setTimeout(() => setOrderStatus('Ready'), 3000); // Simulate order preparation
  };

  const [numColumns, setNumColumns] = useState(3);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
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
              <View style={styles.content}>
                <Text style={styles.title}>Menu Categories</Text>
                {Object.keys(menuData).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={styles.button}
                    onPress={() => {
                      setSelectedCategory(category);
                      setCurrentScreen('Menu');
                    }}
                  >
                    <Text style={styles.buttonText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ImageBackground>
          </SafeAreaView>
        );
      case 'Menu':
        return (
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
            <Text style={styles.title}>{selectedCategory} Menu</Text>
            <FlatList
              data={menuData[selectedCategory]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.menuItem}>
                  <Text style={styles.itemText}>{item.name} - €{item.price}</Text>
                  <Button title="Add" onPress={() => handleAddToCart(item)} />
                </View>
              )}
                numColumns={numColumns} // Χρησιμοποιεί την κατάσταση
                columnWrapperStyle={styles.row}
                key={`numColumns-${numColumns}`} // Δημιουργεί μοναδικό key
            />
            <Button title="Go to Cart" onPress={() => setCurrentScreen('Cart')} />
            <Button title="Back to Home" onPress={() => setCurrentScreen('Home')} />
            </ImageBackground>
            </SafeAreaView>

        );
      case 'Cart':
        return (
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
            <Text style={styles.title}>Your Cart</Text>
            {cart.length > 0 ? (
              <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.itemText}>{item.name} - ${item.price}</Text>
                )}
              />
            ) : (
              <Text style={styles.itemText}>Your cart is empty.</Text>
            )}
            {cart.length > 0 && (
              <Button title="Place Order" onPress={handlePlaceOrder} />
            )}
            <Text style={styles.status}>Order Status: {orderStatus}</Text>
            <Button title="Back to Home" onPress={() => setCurrentScreen('Home')} />
            </ImageBackground>
            </SafeAreaView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
};

export default cafe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: Platform.OS === 'web' ? 200 : 150,
    marginTop: Platform.OS === 'web' ? 0 : 40,
    position: 'absolute',
    top: Platform.OS === 'web' ? -60 : -70,
  },
  content: {
    marginTop: 150,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    padding: 15,
    backgroundColor: '#606FB6',
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemText: {
    fontSize: 18,
    color: 'white',
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around', // Κεντράρει τα αντικείμενα στις σειρές
    marginBottom: 15,
  },
});
