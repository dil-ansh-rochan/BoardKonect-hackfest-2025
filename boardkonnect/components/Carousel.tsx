import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Pressable, Linking } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SPACING = 20;

interface CarouselItem {
  image: any;
  title: string;
  subtitle: string;
  url: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
      translateX.value = withTiming(-nextIndex * (CARD_WIDTH + SPACING), {
        duration: 500,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePress = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % items.length 
      : (currentIndex - 1 + items.length) % items.length;
    
    setCurrentIndex(newIndex);
    translateX.value = withTiming(-newIndex * (CARD_WIDTH + SPACING), {
      duration: 500,
    });
  };

  const handleItemPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.cardsContainer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {items.map((item, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];

          const animatedStyle = useAnimatedStyle(() => {
            return {
              opacity: interpolate(
                translateX.value,
                inputRange,
                [0.5, 1, 0.5],
                Extrapolate.CLAMP
              ),
              scale: interpolate(
                translateX.value,
                inputRange,
                [0.8, 1, 0.8],
                Extrapolate.CLAMP
              ),
            };
          });

          return (
            <Pressable 
              key={index}
              onPress={() => handleItemPress(item.url)}
            >
              <Animated.View style={[styles.card, animatedStyle]}>
                <Animated.Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.overlay}>
                  <ThemedText style={styles.title}>{item.title}</ThemedText>
                  <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>
                </View>
              </Animated.View>
            </Pressable>
          );
        })}
      </Animated.View>

      <View style={styles.controls}>
        <Pressable 
          style={styles.controlButton}
          onPress={() => handlePress('prev')}
        >
          <ThemedText style={styles.controlText}>←</ThemedText>
        </Pressable>
        <Pressable 
          style={styles.controlButton}
          onPress={() => handlePress('next')}
        >
          <ThemedText style={styles.controlText}>→</ThemedText>
        </Pressable>
      </View>

      <View style={styles.pagination}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  card: {
    width: CARD_WIDTH,
    height: '100%',
    marginRight: SPACING,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
}); 