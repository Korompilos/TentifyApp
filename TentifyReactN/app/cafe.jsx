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
    { id: '4', name: 'Water', price: 0.5 },
    { id: '5', name: 'Orange Juice', price: 3.0 },
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
    { id: '24', name: 'Pizza Pepperoni', price: 9.0 },
    { id: '25', name: 'Pizza Margherita', price: 8.5 },
    { id: '26', name: 'Chicken Wings', price: 5.0 },
    { id: '26', name: 'Chicken Strips', price: 5.5 },
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

  const handleRemoveFromCart = (item) => {
    setCart((prev) => {
      const index = prev.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        const updatedCart = [...prev];
        updatedCart.splice(index, 1); // Αφαιρεί μόνο το πρώτο που βρίσκει
        return updatedCart;
      }
      return prev;
    });
  };



  const handlePlaceOrder = () => {
    setOrderStatus('Processing');
    setTimeout(() => setOrderStatus('Ready'), 6000); // Simulate order preparation
    setTimeout(() => setOrderStatus('Delivered'), 10000); // Simulate order preparation
    setTimeout(() => setOrderStatus('Make another Delivery!'), 12000); // Simulate order preparation
    setTimeout(() => setCart([]), 13000)
  };

  

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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setCurrentScreen('Chat');
                  }}
                >
                  <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
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
            <Text style={styles.title2}>{selectedCategory} Menu</Text>
              <View style={{ flex: 1, paddingTop: 100 }}>
              <FlatList
                data={menuData[selectedCategory]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <Text style={styles.itemText}>{item.name} - €{item.price}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={2} // Ορίζει ότι θα υπάρχουν 2 στήλες
                columnWrapperStyle={styles.row} // Ευθυγραμμίζει οριζόντια τα στοιχεία
                key={`numColumns-2`} // Για να ανανεώνεται σωστά η λίστα
              />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Cart')}>
                  <Text style={styles.navButtonText}>GO TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Home')}>
                  <Text style={styles.navButtonText}>BACK</Text>
                </TouchableOpacity>
              </View>
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
              <Text style={styles.title2}>Your Cart</Text>
              <View style={{ flex: 1, paddingTop: 100 }}>
                {cart.length > 0 ? (
                  <FlatList
                    data={cart}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.menuItem}>
                        <Text style={styles.itemText}>{item.name} - €{item.price}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => handleRemoveFromCart(item)}>
                          <Text style={styles.addButtonText}>-</Text>
                        </TouchableOpacity>
                      </View>

                    )}
                    numColumns={2} // Ορίζει ότι θα υπάρχουν 2 στήλες
                    columnWrapperStyle={styles.row} // Ευθυγραμμίζει οριζόντια τα στοιχεία
                    key={`numColumns-2`} // Για να ανανεώνεται σωστά η λίστα
                  />
                ) : (
                  <Text style={styles.itemText}>Your cart is empty.</Text>
                )}
                {cart.length > 0 && (
                  <Button title="Place Order" onPress={handlePlaceOrder} />
                )}
                <Text style={styles.status}>Order Status: {orderStatus}</Text>
                <Button title="Back" onPress={() => setCurrentScreen('Home')} color='#606FB6' />
              </View>
            </ImageBackground>
          </SafeAreaView>
        );
      case 'Chat':
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
  buttonContainer: {
    marginTop: 40, // Σπρώχνει τα κουμπιά πιο κάτω
    flexDirection: 'row', // Τα κάνει να μπαίνουν δίπλα-δίπλα
    justifyContent: 'center', // Κεντράρει οριζόντια
    top: -40
  },
  navButton: {
    backgroundColor: '#606FB6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10, // Δίνει απόσταση μεταξύ των κουμπιών
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%',
    height: Platform.OS === 'web' ? 200 : 150,
    marginTop: Platform.OS === 'web' ? 0 : 40,
    position: 'absolute',
    top: Platform.OS === 'web' ? -60 : -70,
  },
  btns: {
    backgroundColor: '#606FB6',
    borderRadius: 15,
  },
  content: {
    marginTop: 150,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    fontFamily: 'Things',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    top: 0
  },
  title2: {
    fontSize: 44,
    fontFamily: 'Things',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    top: 100
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
    fontSize: 28,
    fontFamily: 'Things',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5, // Για να μην κολλάνε στις άκρες
    minWidth: '45%', // Για να έχουν παρόμοιο πλάτος
  },
  itemText: {
    fontSize: 18,
    color: 'white',
    flex: 1, // Για σωστή στοίχιση
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#606FB6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  status: {
    marginTop: 20,
    fontSize: 28,
    fontFamily: 'Things',
    textAlign: 'center',
    color: 'white',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around', // Δημιουργεί χώρο ανάμεσα στις στήλες
    marginBottom: 10,
  },
});
