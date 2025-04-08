import { StyleSheet, ScrollView, View, Pressable, ActivityIndicator, Linking, Platform, Alert, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

interface SettingItemProps {
  title: string;
  subtitle: string;
  isEnabled: boolean;
  type?: string;
  onPress?: () => void;
}

interface SettingItem {
  title: string;
  subtitle: string;
  url: string;
  isEnabled: boolean;
  type?: string;
}

function SettingItem({ title, subtitle, isEnabled, type, onPress }: SettingItemProps) {
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
  const { user } = useAuth();
  const [settingsItems, setSettingsItems] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user?.profile?.country) {
        console.log('No country found for user');
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
        
        setSettingsItems(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user?.profile?.country]);

  const handleSettingPress = async (item: SettingItem) => {
    if (item.type === 'calender') {
      try {
        const calendarUrl = Platform.select({
          ios: 'calshow:',
          android: 'content://com.android.calendar',
        });

        if (!calendarUrl) {
          throw new Error('Platform not supported');
        }

        const supported = await Linking.canOpenURL(calendarUrl);
        
        if (supported) {
          await Linking.openURL(calendarUrl);
        } else {
          Alert.alert(
            'Calendar Not Available',
            'Unable to open calendar. Please check your device settings.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error opening calendar:', error);
      
      }
    } if(!item.isEnabled){
      Alert.alert(
        'Message',
        `Action is not available in ${user?.profile?.country} region`,
        [{ text: 'OK' }]
      );
    } else {
      console.log('Pressed:', item.title);
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
        <ThemedText style={styles.headerTitle}>Board (R) Actions</ThemedText>
      </ThemedView>
      
      <View style={styles.content}>
        {settingsItems.map((item, index) => (
          <SettingItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            isEnabled={item?.isEnabled||false}
            type={item.type}
            onPress={() => handleSettingPress(item)}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
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
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
}); 