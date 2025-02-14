import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../app/(tabs)/home';
import ProductsScreen from '../app/(tabs)/products';
import GalleryScreen from '../app/(tabs)/gallery';
import ContactScreen from '../app/(tabs)/contact';
import { CustomTabBar } from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="products" component={ProductsScreen} />
      <Tab.Screen name="gallery" component={GalleryScreen} />
      <Tab.Screen name="contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}
