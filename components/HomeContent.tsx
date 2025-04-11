import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, Platform } from 'react-native';
import { Text, Button, useTheme, Card } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  FadeInDown,
  FadeInRight
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export function HomeContent() {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: '#F1F8E9' }]}>
      <View style={styles.container}>
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          style={styles.heroSection}
        >
          <Image
            source={{ uri: 'https://your-hero-image.jpg' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text variant="headlineLarge" style={styles.heroTitle}>
              Icon Wristekk
            </Text>
            <Text variant="titleMedium" style={styles.heroSubtitle}>
              Crafting Premium Leather Since 1995
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(600).springify()}>
          <Card style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
            <Card.Content>
              <Text variant="titleLarge" style={[styles.cardTitle, { color: '#4CAF50' }]}>
                Our Story
              </Text>
              <Text style={[styles.storyText, { color: '#2E2E2E' }]}>
                Icon Wristekk started in 2005 as a Partnership Company, bringing decades of leather crafting expertise to create premium watch straps.
              </Text>
              <Button 
                mode="outlined" 
                onPress={() => router.push('/about')}
                style={styles.storyButton}
                textColor="#4CAF50"
                icon="arrow-right"
              >
                Read More
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(800).springify()}>
          <Card style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
            <Card.Content>
              <Text variant="titleLarge" style={[styles.cardTitle, { color: '#4CAF50' }]}>
                Our Expertise
              </Text>
              <View style={[styles.featureRow, { backgroundColor: '#F1F8E9' }]}>
                <MaterialIcons name="star" size={24} color="#4CAF50" />
                <Text style={[styles.featureText, { color: '#2E2E2E' }]}>
                  Premium Quality Leather
                </Text>
              </View>
              <View style={[styles.featureRow, { backgroundColor: '#F1F8E9' }]}>
                <MaterialIcons name="verified" size={24} color="#4CAF50" />
                <Text style={[styles.featureText, { color: '#2E2E2E' }]}>
                  Expert Craftsmanship
                </Text>
              </View>
            </Card.Content>
          </Card>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(1000).springify()}
          style={[styles.ctaSection, { backgroundColor: '#FFFFFF' }]}
        >
          <Text variant="titleLarge" style={{ color: '#4CAF50', marginBottom: 16 }}>
            Ready to Order?
          </Text>
          <Button 
            mode="contained" 
            style={styles.ctaButton}
            buttonColor="#4CAF50"
            onPress={() => router.push('/products')}
          >
            View Products
          </Button>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  heroSection: {
    height: 200,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#4CAF50',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 16,
  },
  ctaSection: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: 8,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  storyButton: {
    borderColor: '#9CCC65',
    borderRadius: 8,
  },
});