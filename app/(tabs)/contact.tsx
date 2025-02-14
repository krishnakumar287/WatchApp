import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Surface, useTheme, TextInput, Button, Text } from 'react-native-paper';
import Header from '../../components/Header';
import { ThemedView } from '@/components/ThemedView';

export default function ContactScreen() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, email, message });
  };

  return (
    <ThemedView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Surface style={styles.form}>
          <Text variant="headlineMedium" style={styles.title}>Contact Us</Text>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Message"
            value={message}
            onChangeText={setMessage}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <Button 
            mode="contained" 
            onPress={handleSubmit}
            style={styles.button}
          >
            Send Message
          </Button>
        </Surface>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  form: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 