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
      router.replace("/home");
    }
  }, [user]);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error: any) {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
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
            Login
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

          {error ? (
            <Text style={[styles.message, { color: theme.colors.error }]}>
              {error}
            </Text>
          ) : null}

          <Button 
            mode="contained" 
            onPress={handleLogin} 
            style={styles.button}
          >
            Login
          </Button>

          <Button 
            mode="text" 
            onPress={() => router.push("/signup")} 
            style={styles.button}
          >
            Don't have an account? Sign Up
          </Button>

          <Button 
            mode="text" 
            onPress={() => router.push("/forgot-password")} 
            style={styles.button}
          >
            Forgot Password?
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
