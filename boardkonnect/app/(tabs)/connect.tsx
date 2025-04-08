import { StyleSheet, ScrollView, View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ChildItemProps {
  image: string;
  name: string;
  status: string;
  onConnect?: () => void;
}

interface SectionProps {
  title: string;
  items: ChildItemProps[];
}

interface Section {
  title: string;
  items: ChildItemProps[];
}

function ChildItem({ image, name, status, onConnect }: ChildItemProps) {
  return (
    <View style={styles.childItem}>
      <Image 
        source={{ uri: image }} 
        style={styles.childImage}
        defaultSource={require('@/assets/images/partial-react-logo.png')}
      />
      <View style={styles.childTextContainer}>
        <ThemedText style={styles.childName}>{name}</ThemedText>
        <ThemedText style={styles.childStatus}>{status}</ThemedText>
      </View>
      <Pressable 
        style={({ pressed }) => [
          styles.connectButton,
          pressed && styles.pressed
        ]}
        onPress={onConnect}
      >
        <ThemedText style={styles.connectButtonText}>BoardKonect</ThemedText>
      </Pressable>
    </View>
  );
}

function Section({ title, items }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.section}>
      <Pressable 
        style={styles.sectionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <IconSymbol 
          name={isExpanded ? "chevron.down" : "chevron.right"} 
          size={20} 
          color="#666" 
        />
      </Pressable>
      
      {isExpanded && (
        <View style={styles.sectionContent}>
          {items.map((item, index) => (
            <ChildItem
              key={index}
              image={item.image}
              name={item.name}
              status={item.status}
              onConnect={() => console.log('Connect to:', item.name)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function ConnectScreen() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchConnectData();
  }, []);

  const fetchConnectData = async () => {
    try {
      // Replace with your actual API URL
      const response = await fetch(`https://board-konect-hackfest-2025.vercel.app/api/connect/${user?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch connect data');
      }
      const data = await response.json();
      setSections(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching connect data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.header}>
        <Image
          source={require('@/assets/images/app_icon.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <ThemedText style={styles.headerTitle}>BoardKonect</ThemedText>
      </ThemedView>
      
      <View style={styles.content}>
        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            items={section.items}
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
    paddingTop: 25,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e00d00',
    gap: 10,
    alignItems: 'center',
    justifyContent:'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionContent: {
    padding: 8,
  },
  childItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  childImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  childTextContainer: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  childStatus: {
    fontSize: 14,
    color: '#666',
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e00d00',
    fontSize: 16,
  },
}); 