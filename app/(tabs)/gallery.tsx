import React from 'react';
import { StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import Header from '../../components/Header';
import { ThemedView } from '@/components/ThemedView';

const DUMMY_IMAGES = [
  { id: '1', url: 'https://via.placeholder.com/300' },
  { id: '2', url: 'https://via.placeholder.com/300' },
  { id: '3', url: 'https://via.placeholder.com/300' },
  { id: '4', url: 'https://via.placeholder.com/300' },
  { id: '5', url: 'https://via.placeholder.com/300' },
  { id: '6', url: 'https://via.placeholder.com/300' },
];

export default function GalleryScreen() {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const imageSize = (windowWidth - 48) / 3;

  const renderImage = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image
        source={{ uri: item.url }}
        style={[styles.image, { width: imageSize, height: imageSize }]}
      />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Header />
      <FlatList
        data={DUMMY_IMAGES}
        renderItem={renderImage}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.galleryList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryList: {
    padding: 16,
  },
  imageContainer: {
    margin: 4,
  },
  image: {
    borderRadius: 8,
  },
}); 