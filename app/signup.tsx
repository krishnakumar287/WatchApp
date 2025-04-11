import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../constants/firebase";
import { TextInput, Button, Text, useTheme, Surface } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";

export default function SignupScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Account already exists. Please log in.");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#F1F8E9' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Surface style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
            <Text variant="headlineMedium" style={[styles.title, { color: '#4CAF50' }]}>
              Create Account
            </Text>
            
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#4CAF50"
              outlineColor="#9CCC65"
              textColor="#2E2E2E"
              theme={{ colors: { text: '#2E2E2E', placeholder: '#757575' }}}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#4CAF50"
              outlineColor="#9CCC65"
              textColor="#2E2E2E"
              theme={{ colors: { text: '#2E2E2E', placeholder: '#757575' }}}
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
              activeOutlineColor="#4CAF50"
              outlineColor="#9CCC65"
              textColor="#2E2E2E"
              theme={{ colors: { text: '#2E2E2E', placeholder: '#757575' }}}
            />

            <Button
              mode="contained"
              onPress={handleSignup}
              style={styles.button}
              buttonColor="#4CAF50"
            >
              Sign Up
            </Button>

            <Button
              onPress={() => router.push("/login")}
              textColor="#4CAF50"
              style={styles.linkButton}
            >
              Already have an account? Login
            </Button>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  linkButton: {
    marginTop: 8,
  },
  error: {
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 16,
  },
});
