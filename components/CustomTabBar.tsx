import { View, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useState, useRef, useEffect } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const scaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    console.log('CustomTabBar rendered');
    console.log('State:', state);
  }, [state]);

  const handlePressIn = (index: number) => {
    Animated.spring(scaleAnims[index], {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scaleAnims[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getTabIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? '#3498DB' : '#95A5A6';
    const iconSize = 24;

    const icons = {
      home: "home",
      products: "shopping-bag",
      gallery: "photo-library",
      contact: "contact-support"
    };

    return (
      <MaterialIcons 
        name={icons[routeName] || "circle"} 
        size={iconSize} 
        color={iconColor} 
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#FF0000', // Change background color for visibility
      borderTopWidth: 1,
      borderTopColor: '#EEEEEE',
      height: Platform.OS === 'ios' ? 85 : 60,
      paddingBottom: Platform.OS === 'ios' ? 20 : 5,
      paddingTop: 5,
      elevation: 8,
      boxShadow: '0 -2px 3px rgba(0, 0, 0, 0.1)', // Use boxShadow instead of shadow*
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1, // Ensure the tab bar is above other components
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
    },
    focusedButton: {
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
    },
    label: {
      fontSize: 12,
      marginTop: 4,
      color: '#95A5A6',
    },
    focusedLabel: {
      color: '#3498DB',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Animated.View
            key={route.key}
            style={[
              styles.tab,
              { transform: [{ scale: scaleAnims[index] }] },
            ]}>
            <TouchableOpacity
              onPress={onPress}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              style={[
                styles.button,
                isFocused && styles.focusedButton,
              ]}>
              {getTabIcon(route.name, isFocused)}
              <Text
                style={[
                  styles.label,
                  isFocused && styles.focusedLabel,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
}