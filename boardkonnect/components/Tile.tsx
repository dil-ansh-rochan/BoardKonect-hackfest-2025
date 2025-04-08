import { StyleSheet, Image, View, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { router } from 'expo-router';
import { IconSymbol, IconSymbolName } from './ui/IconSymbol';

interface TileProps {
  title: string;
  route: string;
  image?: string;
  icon?: IconSymbolName;
}

export function Tile({ image, icon, title, route }: TileProps) {
  const handlePress = () => {
    // Only navigate if the route is defined
    if (route) {
      try {
        router.push(route as any);
      } catch (error) {
        console.log('Route not defined:', route);
      }
    }
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]} 
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.image} 
            resizeMode="contain"
          />
        ) : icon ? (
          <IconSymbol name={icon} size={40} color="#000" />
        ) : null}
      </View>
      <View style={styles.textContainer}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
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
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
}); 