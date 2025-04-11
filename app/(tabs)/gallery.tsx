import React, { useState } from 'react';
import { StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, View } from 'react-native';
import { Surface, useTheme, Modal, Portal, IconButton, Text } from 'react-native-paper';
import Header from '../../components/Header';
import { ThemedView } from '@/components/ThemedView';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeIn,
  ZoomIn
} from 'react-native-reanimated';

const GALLERY_IMAGES = [
  { id: '1', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/3.jpg', title: 'Premium Leather' },
  { id: '2', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/1.jpg', title: 'Craftsmanship' },
  { id: '3', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/3.jpg', title: 'Quality' },
  { id: '4', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/4.jpg', title: 'Design' },
  { id: '5', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/5.jpg', title: 'Innovation' },
  { id: '6', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/6.jpg', title: 'Excellence' },
  { id: '7', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/10.jpg', title: 'Precision' },
  { id: '8', url: 'https://iconwristekk.com/wp-content/uploads/2020/08/9.jpg', title: 'Detail' },
];

export default function GalleryScreen() {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const spacing = 12;
  const imageSize = (windowWidth - (spacing * 3)) / 2;
  const [selectedImage, setSelectedImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const renderImage = ({ item, index }) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    
    return (
      <AnimatedTouchable 
        style={styles.imageContainer}
        entering={ZoomIn.delay(index * 100).springify()}
        onPress={() => {
          setSelectedImage(item);
          setVisible(true);
        }}
      >
        <Surface style={styles.imageSurface}>
          <Image
            source={{ uri: item.url }}
            style={[styles.image, { width: imageSize, height: imageSize }]}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text variant="titleSmall" style={styles.imageTitle}>
              {item.title}
            </Text>
          </View>
        </Surface>
      </AnimatedTouchable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Header />
      <Animated.View 
        entering={FadeInDown.springify()}
        style={styles.headerContainer}
      >
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Our Gallery
        </Text>
        <Text variant="titleMedium" style={styles.headerSubtitle}>
          Showcasing our finest work
        </Text>
      </Animated.View>

      <FlatList
        data={GALLERY_IMAGES}
        renderItem={renderImage}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.galleryList}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <IconButton
            icon="close"
            size={24}
            iconColor="#FFFFFF"
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          />
          {selectedImage && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImage.url }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text variant="titleLarge" style={styles.modalTitle}>
                {selectedImage.title}
              </Text>
            </View>
          )}
        </Modal>
      </Portal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#9CCC65',
    marginTop: 4,
  },
  galleryList: {
    padding: 12,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageSurface: {
    elevation: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  imageTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    margin: 0,
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '80%',
  },
  modalTitle: {
    color: '#FFFFFF',
    marginTop: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}); 