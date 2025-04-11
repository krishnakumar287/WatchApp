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
        { backgroundColor: '#F1F8E9' }
      ]}
    >
      <Surface style={[styles.surface, { backgroundColor: '#FFFFFF' }]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.container}
        >
          <Text variant="headlineMedium" style={[styles.title, { color: '#4CAF50' }]}>
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
            outlineColor="#9CCC65"
            activeOutlineColor="#4CAF50"
            textColor="#2E2E2E"
            theme={{ colors: { text: '#2E2E2E', placeholder: '#757575' }}}
          />

          {error ? (
            <Text style={[styles.message, { color: '#B00020' }]}>
              {error}
            </Text>
          ) : null}
          
          {message ? (
            <Text style={[styles.message, { color: '#4CAF50' }]}>
              {message}
            </Text>
          ) : null}

          <Button 
            mode="contained" 
            onPress={handleResetPassword} 
            style={styles.button}
            buttonColor="#4CAF50"
          >
            Send Reset Link
          </Button>

          <Button 
            mode="text" 
            onPress={() => router.push("/login")} 
            style={styles.button}
            textColor="#4CAF50"
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
