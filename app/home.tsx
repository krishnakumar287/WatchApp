import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { Surface, useTheme } from "react-native-paper";

import { WelcomeAnimation } from "../components/WelcomeAnimation";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Header />
      <Surface style={styles.content}>
        <WelcomeAnimation />
      </Surface>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    elevation: 1,
  },
});
