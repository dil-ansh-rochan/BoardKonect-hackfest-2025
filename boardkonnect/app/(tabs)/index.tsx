import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Carousel } from '@/components/Carousel';
import { GridSection } from '@/components/GridSection';
import { ImageScroll } from '@/components/ImageScroll';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface CarouselItem {
  image: string;
  title: string;
  subtitle: string;
  url: string;
}

interface GridItem {
  title: string;
  route: string;
  image: string;
}

interface CustomerARRItem {
  source: string;
  title: string;
  url: string;
}

interface HomePageData {
  carousel: CarouselItem[];
  grcContent: GridItem[];
  customerARR: CustomerARRItem[];
}

export default function HomeScreen() {
  const { user } = useAuth();
  console.log(user);
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchHomePageData();
    }
  }, [user?.id]);

  const fetchHomePageData = async () => {
    try {
      const response = await fetch(`https://board-konect-hackfest-2025.vercel.app/api/home?userId=${user?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>No data available</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Carousel items={data.carousel} />
      <GridSection title={`${user?.profile?.country} GRC Content`} items={data.grcContent} />
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Top 5 Customers</ThemedText>
        <ImageScroll images={data.customerARR} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
