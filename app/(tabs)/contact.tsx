import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Linking, Platform } from 'react-native';
import { Surface, useTheme, TextInput, Button, Text, Card, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { ThemedView } from '@/components/ThemedView';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  FadeInDown,
  interpolate,
  withRepeat,
} from 'react-native-reanimated';

// Add coordinates for the manufacturing unit
const LOCATION = {
  latitude: 12.7409,  // Hosur coordinates
  longitude: 77.8253,
  label: 'Icon Wristekk Manufacturing Unit'
};

export default function ContactScreen() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');

  const formAnimation = useSharedValue(0);
  const contactAnimation = useSharedValue(0);
  const iconAnimation = useSharedValue(0);

  useEffect(() => {
    formAnimation.value = withDelay(300, withTiming(1, { duration: 1000 }));
    contactAnimation.value = withDelay(800, withTiming(1, { duration: 1000 }));
    iconAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const formStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(formAnimation.value, [0, 1], [50, 0]) },
    ],
    opacity: formAnimation.value,
  }));

  const contactStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(contactAnimation.value, [0, 1], [100, 0]) },
    ],
    opacity: contactAnimation.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(iconAnimation.value, [0, 1], [1, 1.2]) },
    ],
  }));

  const handleSubmit = () => {
    console.log({ name, email, message, phone });
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleOpenMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${LOCATION.latitude},${LOCATION.longitude}`;
    const label = LOCATION.label;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.springify()}>
          <Text variant="headlineMedium" style={styles.mainTitle}>
            Get In Touch!
          </Text>

          <Animated.View style={formStyle}>
            <Surface style={styles.form}>
              <Text variant="titleLarge" style={styles.formTitle}>
                Send us a Message
              </Text>
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                outlineColor="#9CCC65"
                activeOutlineColor="#4CAF50"
                left={<TextInput.Icon icon="account" color="#9CCC65" />}
              />
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                style={styles.input}
                outlineColor="#9CCC65"
                activeOutlineColor="#4CAF50"
                left={<TextInput.Icon icon="email" color="#9CCC65" />}
              />
              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.input}
                outlineColor="#9CCC65"
                activeOutlineColor="#4CAF50"
                left={<TextInput.Icon icon="phone" color="#9CCC65" />}
              />
              <TextInput
                label="Message"
                value={message}
                onChangeText={setMessage}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.messageInput}
                outlineColor="#9CCC65"
                activeOutlineColor="#4CAF50"
                left={<TextInput.Icon icon="message-text" color="#9CCC65" />}
              />
              <Button 
                mode="contained" 
                onPress={handleSubmit}
                style={styles.submitButton}
                buttonColor="#4CAF50"
                icon="send"
              >
                Send Message
              </Button>
            </Surface>
          </Animated.View>

          <Animated.View style={contactStyle}>
            <Card style={styles.contactCard}>
              <Card.Content>
                <View style={styles.contactSection}>
                  <Animated.View style={iconStyle}>
                    <MaterialIcons name="location-on" size={24} color="#4CAF50" />
                  </Animated.View>
                  <View style={styles.sectionContent}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                      Manufacturing Unit
                    </Text>
                    <Text style={styles.addressText}>
                      7/201 Rajeshwari,{'\n'}
                      Layout, Begepalli-Post,{'\n'}
                      Sipcot-1, Hosur,{'\n'}
                      Tamilnadu – 635 126{'\n'}
                      India
                    </Text>
                    <Button
                      mode="outlined"
                      onPress={handleOpenMap}
                      style={styles.mapButton}
                      icon={() => <MaterialIcons name="map" size={20} color="#4CAF50" />}
                      textColor="#4CAF50"
                    >
                      View in Maps
                    </Button>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.contactSection}>
                  <MaterialIcons name="phone" size={24} color="#4CAF50" />
                  <View style={styles.sectionContent}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                      Call Us
                    </Text>
                    <Button
                      mode="text"
                      onPress={() => handleCall('919344498033')}
                      textColor="#4CAF50"
                      style={styles.contactButton}
                      icon={() => <MaterialIcons name="phone" size={20} color="#4CAF50" />}
                    >
                      +91 93444 98033
                    </Button>
                    <Button
                      mode="text"
                      onPress={() => handleCall('917598697033')}
                      textColor="#4CAF50"
                      style={styles.contactButton}
                      icon={() => <MaterialIcons name="phone" size={20} color="#4CAF50" />}
                    >
                      +91 75986 97033
                    </Button>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.contactSection}>
                  <MaterialIcons name="email" size={24} color="#4CAF50" />
                  <View style={styles.sectionContent}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                      Email Us
                    </Text>
                    <Button
                      mode="text"
                      onPress={() => handleEmail('iconwristekk@gmail.com')}
                      textColor="#4CAF50"
                      style={styles.contactButton}
                      icon={() => <MaterialIcons name="email" size={20} color="#4CAF50" />}
                    >
                      iconwristekk@gmail.com
                    </Button>
                    <Button
                      mode="text"
                      onPress={() => handleEmail('vadivelu.wristekk@gmail.com')}
                      textColor="#4CAF50"
                      style={styles.contactButton}
                      icon={() => <MaterialIcons name="email" size={20} color="#4CAF50" />}
                    >
                      vadivelu.wristekk@gmail.com
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  content: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  mainTitle: {
    textAlign: 'center',
    marginVertical: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  form: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formTitle: {
    color: '#4CAF50',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  messageInput: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    minHeight: 120,
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  contactCard: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  sectionContent: {
    flex: 1,
    marginLeft: 16,
  },
  sectionTitle: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2E2E2E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  contactButton: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginVertical: 4,
  },
  mapButton: {
    marginTop: 12,
    borderColor: '#9CCC65',
    borderRadius: 8,
  },
}); 