import React, { useState } from "react";
import { StyleSheet, Platform, View } from "react-native";
import { Appbar, Menu, useTheme, Badge } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/AuthProvider";
import { useCart } from "../hooks/CartProvider";
import { router } from "expo-router";

export default function Header() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [visible, setVisible] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Appbar.Header 
      style={[styles.header, { backgroundColor: '#F1F8E9' }]}
      mode="center-aligned"
    >
      <Appbar.Content 
        title="Iconwristekk" 
        titleStyle={[styles.title, { color: '#4CAF50' }]}
      />
      <View style={styles.actions}>
        <View>
          <Appbar.Action
            icon={() => (
              <MaterialIcons 
                name="shopping-cart" 
                size={24} 
                color="#4CAF50" 
              />
            )}
            onPress={() => router.push('/(stack)/cart')}
          />
          {totalItems > 0 && (
            <Badge
              size={20}
              style={styles.badge}
            >
              {totalItems}
            </Badge>
          )}
        </View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              icon={() => (
                <MaterialIcons 
                  name="account-circle" 
                  size={24} 
                  color="#4CAF50" 
                />
              )}
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item 
            title={user?.email || "Guest"}
            leadingIcon="email"
            titleStyle={{ color: '#2E2E2E' }}
          />
          <Menu.Item 
            title="Logout" 
            onPress={logout}
            leadingIcon="logout"
            titleStyle={{ color: '#D32F2F' }}
          />
        </Menu>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    borderBottomWidth: 0,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#4CAF50',
  },
});
