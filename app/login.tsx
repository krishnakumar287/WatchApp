import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../constants/firebase";
import { useAuth } from "../hooks/AuthProvider";
import { TextInput, Button, Text, useTheme, Surface } from "react-native-paper";

export default function LoginScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#F1F8E9' }]}>
      <Surface style={[styles.surface, { backgroundColor: '#FFFFFF' }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.form}
        >
          <Text variant="headlineLarge" style={[styles.title, { color: '#4CAF50' }]}>
            Welcome Back
          </Text>
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            outlineColor="#9CCC65"
            activeOutlineColor="#4CAF50"
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
            outlineColor="#9CCC65"
            activeOutlineColor="#4CAF50"
            textColor="#2E2E2E"
            theme={{ colors: { text: '#2E2E2E', placeholder: '#757575' }}}
          />

          {error && (
            <Text style={styles.error}>{error}</Text>
          )}

          <Button 
            mode="contained" 
            onPress={handleLogin}
            style={styles.button}
            buttonColor="#4CAF50"
          >
            Login
          </Button>

          <Button 
            mode="outlined" 
            onPress={() => router.push("/signup")}
            style={[styles.button, { borderColor: '#9CCC65' }]}
            textColor="#4CAF50"
          >
            Create Account
          </Button>

          <Button 
            mode="text" 
            onPress={() => router.push("/forgot-password")}
            style={styles.button}
            textColor="#4CAF50"
          >
            Forgot Password?
          </Button>
        </KeyboardAvoidingView>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  form: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  error: {
    color: '#D32F2F',
    marginBottom: 16,
    textAlign: 'center',
  }
});
