import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../constants/firebase";
import { TextInput, Button, Text, useTheme, Surface } from "react-native-paper";

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link has been sent to your email. Please check your inbox.");
    } catch (error: any) {
      setError("Something went wrong. Please try again.");
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
            Forgot Password
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

          {error ? (
            <Text style={[styles.message, { color: theme.colors.error }]}>
              {error}
            </Text>
          ) : null}
          
          {message ? (
            <Text style={[styles.message, { color: theme.colors.primary }]}>
              {message}
            </Text>
          ) : null}

          <Button 
            mode="contained" 
            onPress={handleResetPassword} 
            style={styles.button}
          >
            Send Reset Link
          </Button>

          <Button 
            mode="text" 
            onPress={() => router.push("/login")} 
            style={styles.button}
          >
            Back to Login
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
