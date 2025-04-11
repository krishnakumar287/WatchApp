import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from "../hooks/AuthProvider";
import { Stack } from "expo-router";
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from "../hooks/CartProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <AuthProvider>  
        <CartProvider>
          <PaperProvider theme={theme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen 
                name="(tabs)" 
                options={{ 
                  headerShown: false,
                  animation: 'none',
                }} 
              />
              <Stack.Screen 
                name="product-detail" 
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen 
                name="cart" 
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen name="login" />
              <Stack.Screen name="signup" />
              <Stack.Screen name="forgot-password" />
            </Stack>
          </PaperProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
