import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import Header from "../../components/Header";
import { HomeContent } from "../../components/HomeContent";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <StatusBar 
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <Header />
        <HomeContent />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 