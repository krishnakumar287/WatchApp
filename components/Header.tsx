import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { Appbar, Menu, useTheme, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/AuthProvider";
import { router } from "expo-router";

export default function Header() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    try {
      closeMenu();
      await logout();
      setTimeout(() => {
        router.push("/");
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Appbar.Header 
      style={[
        styles.header,
        { backgroundColor: theme.colors.primary }
      ]}
    >
      <Appbar.Content 
        title="Iconwristekk" 
        titleStyle={[
          styles.title,
          { color: '#FFFFFF', fontWeight: '600', fontSize: 24 }
        ]}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon={() => (
              <MaterialIcons 
                name="account-circle" 
                size={30} 
                color="#FFFFFF" 
              />
            )}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item 
          title={user?.email || "Guest"}
          leadingIcon="email"
          disabled
        />
        <Menu.Item 
          title="Logout" 
          onPress={handleLogout}
          leadingIcon="logout"
          titleStyle={{ color: theme.colors.error }}
        />
      </Menu>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)', // Use boxShadow instead of shadow*
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    letterSpacing: 0.5,
  },
});
