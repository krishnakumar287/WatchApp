import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

export function ThemedView({ style, ...otherProps }) {
  const theme = useTheme();

  return (
    <View 
      style={[
        { 
          flex: 1,
          backgroundColor: theme.colors.background 
        }, 
        style
      ]} 
      {...otherProps} 
    />
  );
}
