import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the backend
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  if (!products.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {products.map(product => (
        <View key={product._id} style={styles.productCard}>
          <Text>{product.description}</Text>
          <Text>Price: ${product.amount}</Text>
          <Image
            source={{ uri: `http://localhost:5000${product.image}` }} // Correct URL
            style={styles.image}
            resizeMode="contain"  // Correct way to set resizeMode
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productCard: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ProductDetails;
