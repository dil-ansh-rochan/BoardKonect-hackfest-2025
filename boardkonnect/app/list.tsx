import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router, useLocalSearchParams } from 'expo-router';

interface ListItemProps {
  title: string;
  subtitle: string;
  onPress?: () => void;
}

function ListItem({ title, subtitle, onPress }: ListItemProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.listItem,
        pressed && styles.pressed
      ]} 
      onPress={onPress}
    >
      <View style={styles.listItemContent}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.itemTitle}>{title}</ThemedText>
          <ThemedText style={styles.itemSubtitle}>{subtitle}</ThemedText>
        </View>
        <IconSymbol name="chevron.right" size={20} color="#666" />
      </View>
    </Pressable>
  );
}

export default function ListScreen() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const displayTitle = title || 'Settings';

  const listItems = [
    {
      title: 'Game Settings',
      subtitle: 'Configure your game preferences and rules',
    },
    {
      title: 'Player Profiles',
      subtitle: 'Manage player information and statistics',
    },
    {
      title: 'Game History',
      subtitle: 'View your past games and results',
    },
    {
      title: 'Achievements',
      subtitle: 'Track your gaming milestones',
    },
    {
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
    },
    {
      title: 'Help & Support',
      subtitle: 'Get assistance and learn more',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={handleBack}
        >
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>{displayTitle}</ThemedText>
      </ThemedView>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {listItems.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => console.log('Pressed:', item.title)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  listItem: {
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
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
}); 