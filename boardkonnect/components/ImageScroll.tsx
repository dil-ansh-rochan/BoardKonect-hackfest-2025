import { StyleSheet, ScrollView, Image, View, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from './ThemedText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 65;
const ITEM_HEIGHT = 65;
const SPACING = 6;

interface ImageScrollProps {
  images: {
    source: string;
    title: string;
    url?: string;
  }[];
}

export function ImageScroll({ images }: ImageScrollProps) {
  const handlePress = async (url?: string) => {
    if (url) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => handlePress(item.url)}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: item.source }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.titleContainer}>
              <ThemedText style={styles.title} numberOfLines={1}>
                {item.title}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: ITEM_WIDTH / 2,
  },
  titleContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 11,
    textAlign: 'center',
  },
}); 