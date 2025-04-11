/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#8C7851'; // Antique Gold
const tintColorDark = '#C0C0C0'; // Silver

export const Colors = {
  light: {
    text: '#FFFFFF', // White
    background: '#1C1C1C', // Jet Black
    tint: tintColorLight,
    icon: '#9E9E9E', // Soft Silver
    tabIconDefault: '#9E9E9E', // Soft Silver
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF', // White
    background: '#1C1C1C', // Jet Black
    tint: tintColorDark,
    icon: '#9E9E9E', // Soft Silver
    tabIconDefault: '#9E9E9E', // Soft Silver
    tabIconSelected: tintColorDark,
  },
};
