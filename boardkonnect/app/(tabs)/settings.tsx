import { StyleSheet, ScrollView, View, Pressable, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface SettingItem {
  title: string;
  subtitle: string;
  url: string;
}

export default function SettingsScreen() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user?.profile?.country) {
        console.log('Missing country data');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const url = `https://board-konect-hackfest-2025.vercel.app/api/settings/${user.profile.country.toLowerCase()}`;
        console.log('Fetching settings from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received settings:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected an array');
        }
        
        setSettings(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user?.profile?.country]);

  const handleItemPress = (url: string) => {
    if (url) {
      if (url.startsWith('/')) {
        router.push(url as any);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
      </ThemedView>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settings.map((setting, index) => (
          <Pressable 
            key={index}
            style={({ pressed }) => [
              styles.settingItem,
              pressed && styles.pressed
            ]}
            onPress={() => handleItemPress(setting.url)}
          >
            <View style={styles.settingItemContent}>
              <View style={styles.textContainer}>
                <ThemedText style={styles.settingTitle}>{setting.title}</ThemedText>
                <ThemedText style={styles.settingSubtitle}>{setting.subtitle}</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#666" />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
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
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
}); 