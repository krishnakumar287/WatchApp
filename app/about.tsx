import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, useTheme, Button, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#F1F8E9' }]}>
      <View style={[styles.header, { backgroundColor: '#4CAF50' }]}>
        <Button
          icon={() => (
            <MaterialIcons name="arrow-back" size={24} color="white" />
          )}
          onPress={() => router.back()}
          textColor="white"
        >
          Back
        </Button>
        <Text variant="titleLarge" style={styles.headerTitle}>
          About Us
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.duration(1000)}
          style={styles.content}
        >
          <Surface style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
            <Text variant="headlineSmall" style={[styles.title, { color: '#4CAF50' }]}>
              About Icon Wristekk
            </Text>
            <Text variant="titleMedium" style={[styles.subtitle, { color: '#9CCC65' }]}>
              Manufacturer of Watch Straps
            </Text>

            <View style={styles.section}>
              <Text variant="bodyLarge" style={[styles.paragraph, { color: '#2E2E2E' }]}>
                Icon Wristekk started in the year 2005 as a Partnership Company. We are one of the leading manufacturers and suppliers of Genuine Leather Straps. We have a highly experienced and dedicated team which is one of the key strengths of our Company.
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: '#F1F8E9', padding: 16, borderRadius: 8 }]}>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: '#4CAF50' }]}>
                Our Goal
              </Text>
              <Text variant="bodyLarge" style={[styles.paragraph, { color: '#2E2E2E' }]}>
                Our goal is to improve the Customer base through quality products.
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: '#4CAF50' }]}>
                Experience & Expertise
              </Text>
              <Text variant="bodyLarge" style={[styles.paragraph, { color: '#2E2E2E' }]}>
                We have experience since 1995, out of which 10 years we're involved in one of the leading watch straps manufacturing units in the world, got a rich knowledge about straps.
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: '#F1F8E9', padding: 16, borderRadius: 8 }]}>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: '#4CAF50' }]}>
                Production Capacity
              </Text>
              <Text variant="bodyLarge" style={[styles.paragraph, { color: '#2E2E2E' }]}>
                On average, we have the capacity of up to 600,000 Straps per Annum. At present we are manufacturing around 420,000 Straps per Annum. We also doing exports globally.
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: '#4CAF50' }]}>
                Manufacturing Capabilities
              </Text>
              <Text variant="bodyLarge" style={[styles.paragraph, { color: '#2E2E2E' }]}>
                Straps are manufacturing by our own Technology of machines and tools. We have 71 variants and 50 types of toolings range from 8 to 30 mm and we have different types of leather prints.
              </Text>
            </View>
          </Surface>
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 4,
  },
  headerTitle: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 24,
  },
});