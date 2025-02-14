import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import { Text, Button, useTheme, Card } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withDelay,
  FadeInDown,
  FadeInRight
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export function HomeContent() {
  const theme = useTheme();
  const scaleValue = useSharedValue(0.8);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    scaleValue.value = withSpring(1);
    opacityValue.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  return (
    <ScrollView 
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <Animated.View 
        entering={FadeInDown.delay(300).springify()}
        style={styles.heroSection}
      >
        <Image 
          source={{ uri: 'https://iconwristekk.com/wp-content/uploads/2020/07/Logo.jpg' }}
          style={styles.heroImage}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        <View style={styles.heroOverlay}>
          <Text 
            variant="headlineMedium" 
            style={styles.heroTitle}
          >
            Icon Wristekk
          </Text>
          <Text 
            variant="titleMedium" 
            style={styles.heroSubtitle}
          >
            Genuine Leathers Crafted with Creativity
          </Text>
        </View>
      </Animated.View>

      <View style={styles.container}>
        {/* Features Section */}
        <Animated.View 
          entering={FadeInRight.delay(600).springify()}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text 
                variant="titleLarge" 
                style={[styles.cardTitle, { color: theme.colors.primary }]}
              >
                Established Since 1995
              </Text>
              <View style={styles.featureRow}>
                <MaterialIcons name="star" size={24} color={theme.colors.primary} />
                <Text variant="bodyLarge" style={styles.featureText}>
                  Premium Quality Leather
                </Text>
              </View>
              <View style={styles.featureRow}>
                <MaterialIcons name="verified" size={24} color={theme.colors.primary} />
                <Text variant="bodyLarge" style={styles.featureText}>
                  Expert Craftsmanship
                </Text>
              </View>
              <View style={styles.featureRow}>
                <MaterialIcons name="local-shipping" size={24} color={theme.colors.primary} />
                <Text variant="bodyLarge" style={styles.featureText}>
                  Global Shipping
                </Text>
              </View>
            </Card.Content>
          </Card>
        </Animated.View>

        {/* About Section */}
        <Animated.View 
          entering={FadeInDown.delay(900).springify()}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text 
                variant="titleLarge" 
                style={[styles.cardTitle, { color: theme.colors.primary }]}
              >
                Our Story
              </Text>
              <Text variant="bodyLarge" style={styles.text}>
                Founded in 2005, Icon Wristekk has grown to become a leading manufacturer 
                of premium leather watch straps. Our dedication to quality and innovation 
                sets us apart in the industry.
              </Text>
              <Button 
                mode="contained" 
                style={styles.button}
                onPress={() => router.push('/about')}
              >
                Know More
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Contact CTA */}
        <Animated.View 
          entering={FadeInRight.delay(1200).springify()}
          style={[styles.ctaSection, { backgroundColor: theme.colors.primary + '15' }]}
        >
          <Text 
            variant="titleLarge" 
            style={[styles.ctaTitle, { color: theme.colors.primary }]}
          >
            Ready to Order?
          </Text>
          <Button 
            mode="contained" 
            style={styles.ctaButton}
            onPress={() => {}}
          >
            Contact Us Now
          </Button>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
  },
  heroSection: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
  },
  text: {
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  ctaSection: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
  },
});