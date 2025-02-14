import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Text, useTheme } from 'react-native-paper';

export function WelcomeAnimation() {
  const theme = useTheme();
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withTiming(1, { duration: 2000 });
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animation.value, [0, 1], [50, 0]) },
    ],
    opacity: animation.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animation.value, [0, 1], [30, 0]) },
    ],
    opacity: interpolate(animation.value, [0.2, 0.8], [0, 1]),
  }));

  const descriptionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animation.value, [0, 1], [20, 0]) },
    ],
    opacity: interpolate(animation.value, [0.4, 1], [0, 1]),
  }));

  const factoryStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animation.value, [0.6, 1], [0, 1]),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={titleStyle}>
          <Text 
            variant="displayMedium" 
            style={[
              styles.title,
              { color: theme.colors.primary }
            ]}
          >
            Icon Wristekk
          </Text>
        </Animated.View>

        <Animated.View style={[styles.subtitleWrapper, subtitleStyle]}>
          <Text 
            variant="headlineSmall" 
            style={[
              styles.subtitle,
              { color: theme.colors.secondary }
            ]}
          >
            Genuine Leathers Crafted 
            with Creativity
          </Text>
        </Animated.View>

        <Animated.View style={[styles.descriptionWrapper, descriptionStyle]}>
          <Text 
            variant="titleMedium" 
            style={[
              styles.description,
              { color: theme.colors.primary }
            ]}
          >
            Engineered with Elegance,{'\n'}
            Modernized with tech based skills{'\n'}
            since 1995
          </Text>
        </Animated.View>

        <Animated.View style={[styles.factoryWrapper, factoryStyle]}>
          <View 
            style={[
              styles.factoryContainer,
              { backgroundColor: theme.colors.primary + '15' }
            ]}
          >
            <Text 
              variant="labelLarge" 
              style={[
                styles.factoryText,
                { color: theme.colors.primary }
              ]}
            >
              Factory established in the year 2005
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 1,
  },
  subtitleWrapper: {
    marginBottom: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 36,
  },
  descriptionWrapper: {
    marginBottom: 48,
  },
  description: {
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  factoryWrapper: {
    alignItems: 'center',
  },
  factoryContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  factoryText: {
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
}); 