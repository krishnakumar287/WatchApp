import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const customColors = {
  primary: '#2C3E50', // Deep blue-gray
  secondary: '#E74C3C', // Coral red
  accent: '#3498DB', // Bright blue
  background: '#F5F6FA', // Light gray-blue
  surface: '#FFFFFF',
  text: '#2C3E50',
  error: '#E74C3C',
  success: '#2ECC71', // Emerald green
  warning: '#F1C40F', // Sunflower yellow
  disabled: '#95A5A6',
  placeholder: '#BDC3C7',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  onSurface: '#2C3E50',
  notification: '#E74C3C',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498DB',
    background: '#1A1A1A',
    surface: '#2C2C2C',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: '#666666',
    placeholder: '#888888',
  },
}; 