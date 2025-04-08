import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface SettingItemProps {
  title: string;
  subtitle: string;
  isEnabled: boolean;
  onPress?: () => void;
}

function SettingItem({ title, subtitle, isEnabled, onPress }: SettingItemProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      </View>
      <View style={[
        styles.statusDot,
        { backgroundColor: isEnabled ? '#4CAF50' : '#F44336' }
      ]} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const settingsItems = [
    {
      title: 'Push Notifications',
      subtitle: 'Receive updates about games and events',
      isEnabled: true,
    },
    {
      title: 'Email Notifications',
      subtitle: 'Get game updates in your inbox',
      isEnabled: false,
    },
    {
      title: 'Location Services',
      subtitle: 'Find players and games near you',
      isEnabled: true,
    },
    {
      title: 'Dark Mode',
      subtitle: 'Use dark theme for better visibility',
      isEnabled: false,
    },
    {
      title: 'Sound Effects',
      subtitle: 'Play sounds for game events',
      isEnabled: true,
    },
    {
      title: 'Vibration',
      subtitle: 'Get haptic feedback for interactions',
      isEnabled: false,
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
      </ThemedView>
      
      <View style={styles.content}>
        {settingsItems.map((item, index) => (
          <SettingItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            isEnabled={item.isEnabled}
            onPress={() => console.log('Pressed:', item.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
}); 