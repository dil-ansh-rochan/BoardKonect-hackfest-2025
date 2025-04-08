import { StyleSheet, ScrollView, Image, View, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 80;
const SPACING = 12;

interface ImageScrollProps {
  images: {
    source: string;
    title: string;
    url?: string;
  }[];
}

export function ImageScroll({ images }: ImageScrollProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
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
          </View>
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
    fontSize: 14,
    textAlign: 'center',
  },
}); 