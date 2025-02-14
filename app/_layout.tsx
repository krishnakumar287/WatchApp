import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from "../hooks/AuthProvider";
import { Stack } from "expo-router";
import { useColorScheme, Platform } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <AuthProvider>  
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </AuthProvider>
  );
}
