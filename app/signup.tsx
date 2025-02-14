import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../constants/firebase";
import { TextInput, Button, Text, useTheme, Surface } from "react-native-paper";

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
      router.replace("/home");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Account already exists. Please log in.");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.scrollView, 
        { backgroundColor: theme.colors.background }
      ]}
    >
      <Surface style={styles.surface}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.container}
        >
          <Text variant="headlineMedium" style={styles.title}>
            Sign Up
          </Text>

          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          {error ? (
            <Text style={[styles.message, { color: theme.colors.error }]}>
              {error}
            </Text>
          ) : null}

          <Button 
            mode="contained" 
            onPress={handleSignup} 
            style={styles.button}
          >
            Sign Up
          </Button>

          <Button 
            mode="text" 
            onPress={() => router.push("/login")} 
            style={styles.button}
          >
            Already have an account? Log In
          </Button>
        </KeyboardAvoidingView>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  surface: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    elevation: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: "100%",
    marginTop: 8,
  },
});
