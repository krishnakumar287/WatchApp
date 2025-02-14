import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Surface, useTheme, Text, Card, Button } from 'react-native-paper';
import Header from '../../components/Header';
import { ThemedView } from '@/components/ThemedView';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Product 1', price: '$99', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Product 2', price: '$149', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Product 3', price: '$199', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Product 4', price: '$299', image: 'https://via.placeholder.com/150' },
];

export default function ProductsScreen() {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 48) / 2; // Adjust for better spacing

  const renderProduct = ({ item }) => (
    <Card style={[styles.card, { width: cardWidth - 8 }]}>
      <Card.Cover 
        source={{ uri: item.image }} 
        style={styles.cardImage} 
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.productName}>{item.name}</Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          {item.price}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button 
          mode="contained" 
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Buy Now
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <ThemedView style={styles.container}>
      <Header />
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.row}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productList: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    elevation: 4,
    marginBottom: 8,
  },
  cardImage: {
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  cardContent: {
    padding: 8,
  },
  productName: {
    marginBottom: 4,
  },
  cardActions: {
    padding: 8,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  buttonLabel: {
    fontSize: 12,
  },
}); 