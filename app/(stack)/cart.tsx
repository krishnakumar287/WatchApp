import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Button, Card, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import { useCart } from '@/hooks/CartProvider';

export default function CartScreen() {
  const { items, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('Rs', ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#F1F8E9' }]}>
      <Header />
      <ScrollView style={styles.scrollView}>
        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <MaterialIcons name="shopping-cart" size={64} color="#9CCC65" />
            <Text variant="headlineSmall" style={{ color: '#2E2E2E' }}>
              Your cart is empty
            </Text>
            <Button 
              mode="contained" 
              onPress={() => router.push('/(tabs)/products')}
              style={styles.shopButton}
              buttonColor="#4CAF50"
            >
              Shop Now
            </Button>
          </View>
        ) : (
          <View style={styles.cartContent}>
            {items.map((item) => (
              <Card key={item.id} style={styles.cartItem}>
                <Card.Content style={styles.cartItemContent}>
                  <Text variant="titleMedium" style={{ color: '#2E2E2E' }}>
                    {item.name}
                  </Text>
                  <Text variant="titleLarge" style={{ color: '#4CAF50' }}>
                    {item.price} x {item.quantity}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <Button 
                    icon="delete" 
                    textColor="#B00020"
                    onPress={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Actions>
              </Card>
            ))}
            
            <Surface style={styles.totalSection}>
              <Text variant="headlineSmall" style={{ color: '#2E2E2E' }}>
                Total: ${calculateTotal().toFixed(2)}
              </Text>
              <Button 
                mode="contained"
                style={styles.checkoutButton}
                buttonColor="#4CAF50"
                onPress={() => {/* Implement checkout */}}
              >
                Checkout
              </Button>
              <Button 
                mode="outlined"
                style={styles.clearButton}
                textColor="#B00020"
                onPress={clearCart}
              >
                Clear Cart
              </Button>
            </Surface>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  cartContent: {
    padding: 16,
  },
  cartItem: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  cartItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalSection: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  shopButton: {
    marginTop: 16,
  },
  checkoutButton: {
    marginTop: 16,
  },
  clearButton: {
    marginTop: 8,
    borderColor: '#B00020',
  },
}); 