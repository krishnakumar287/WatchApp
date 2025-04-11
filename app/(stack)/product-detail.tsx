import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions, Platform } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useCart } from '@/hooks/CartProvider';
import { Toast } from '@/components/Toast';

const { width } = Dimensions.get('window');

const PRODUCT_DETAILS = {
  '1': {
    name: 'Classic Leather Strap',
    price: '70',
    image: 'https://iconwristekk.com/wp-content/uploads/2020/07/Product1.jpg',
    description: 'Premium quality leather watch strap with classic design.',
    features: [
      'Genuine leather material',
      'Stainless steel buckle',
      'Available in multiple sizes',
      'Water-resistant',
    ],
    specifications: {
      material: 'Genuine Leather',
      width: '20mm',
      length: '75mm/115mm',
      thickness: '2.5mm',
      colors: 'Black, Brown, Tan',
    }
  },
  '2': {
    name: 'Premium Watch Band',
    price: '100',
    image: 'https://iconwristekk.com/wp-content/uploads/2020/07/productv2.jpg',
    description: 'Luxurious premium watch band with modern aesthetics.',
    features: [
      'Premium grade leather',
      'Premium steel clasp',
      'Adjustable sizing',
      'Sweat-resistant',
    ],
    specifications: {
      material: 'Premium Leather',
      width: '22mm',
      length: '80mm/120mm',
      thickness: '2.8mm',
      colors: 'Black, Dark Brown, Navy',
    }
  },
  '3': {
    name: 'Vintage Collection',
    price: '150',
    image: 'https://iconwristekk.com/wp-content/uploads/2020/07/productv3.jpg',
    description: 'Vintage-inspired leather strap with authentic craftsmanship.',
    features: [
      'Aged leather finish',
      'Brass buckle',
      'Hand-stitched details',
      'Patina development',
    ],
    specifications: {
      material: 'Aged Leather',
      width: '18mm',
      length: '70mm/110mm',
      thickness: '3mm',
      colors: 'Cognac, Rustic Brown, Antique Black',
    }
  },
  '4': {
    name: 'Modern Series',
    price: '200',
    image: 'https://iconwristekk.com/wp-content/uploads/2020/07/productv4.jpg',
    description: 'Contemporary design with premium materials and smart features.',
    features: [
      'Full-grain leather',
      'Quick-release spring bars',
      'Hypoallergenic lining',
      'Weather-resistant',
    ],
    specifications: {
      material: 'Full-grain Leather',
      width: '20mm',
      length: '75mm/115mm',
      thickness: '2.6mm',
      colors: 'Black, Brown, Grey, Tan',
    }
  },
  '5': {
    name: 'Elite Series',
    price: '249',
    image: 'https://iconwristekk.com/wp-content/uploads/2020/07/productv5.jpg',
    description: 'Premium elite series with exceptional quality and comfort.',
    features: [
      'Top-grain leather',
      'Premium deployant clasp',
      'Ergonomic design',
      'Luxury finish',
    ],
    specifications: {
      material: 'Top-grain Leather',
      width: '20mm',
      length: '75mm/115mm',
      thickness: '2.7mm',
      colors: 'Black, Brown, Burgundy',
    }
  },
  '6': {
    name: 'Signature Collection',
    price: '399',
    image: 'https://iconwristekk.com/wp-content/uploads/2020/07/product7.jpg',
    description: 'Our flagship collection featuring the finest materials and craftsmanship.',
    features: [
      'Shell cordovan leather',
      'Custom-made buckle',
      'Hand-finished edges',
      'Limited edition',
    ],
    specifications: {
      material: 'Shell Cordovan',
      width: '20mm',
      length: '75mm/115mm',
      thickness: '3mm',
      colors: 'Black, Cognac, Color 8',
    }
  }
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = PRODUCT_DETAILS[id as string];
  const { addToCart } = useCart();
  const [toastVisible, setToastVisible] = useState(false);

  const handleBack = () => {
    router.push('/(tabs)/products');
  };

  const handleAddToCart = () => {
    addToCart({
      id: id as string,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    setToastVisible(true);
  };

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <Text>Product not found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <Button
          icon={() => (
            <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
          )}
          onPress={handleBack}
          textColor="#4CAF50"
        >
          Back
        </Button>
      </View>

      <ScrollView style={styles.scrollView}>
        <Animated.View 
          entering={FadeInDown.duration(800)}
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        <Animated.View 
          entering={FadeInRight.delay(400)}
          style={styles.contentContainer}
        >
          <Surface style={styles.detailsCard}>
            <Text variant="headlineMedium" style={styles.productName}>
              {product.name}
            </Text>
            <Text variant="headlineSmall" style={styles.price}>
              {product.price}
            </Text>
            <Text style={styles.description}>
              {product.description}
            </Text>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Features
            </Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Specifications
            </Text>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specLabel}>{key}:</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}

            <Button
              mode="contained"
              style={styles.buyButton}
              buttonColor="#4CAF50"
              onPress={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Surface>
        </Animated.View>
      </ScrollView>

      <Toast 
        message="Added to cart successfully!"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 16,
  },
  detailsCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  productName: {
    color: '#2E2E2E',
    fontWeight: '600',
  },
  price: {
    color: '#4CAF50',
    marginVertical: 8,
  },
  description: {
    color: '#2E2E2E',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    color: '#2E2E2E',
    fontSize: 16,
  },
  specRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  specLabel: {
    width: 100,
    color: '#2E2E2E',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  specValue: {
    flex: 1,
    color: '#2E2E2E',
    fontSize: 16,
  },
  buyButton: {
    marginTop: 24,
    borderRadius: 8,
  },
}); 