import { StyleSheet, ScrollView, View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

interface ChildItemProps {
  image: any;
  name: string;
  status: string;
  onConnect?: () => void;
}

interface SectionProps {
  title: string;
  items: ChildItemProps[];
}

function ChildItem({ image, name, status, onConnect }: ChildItemProps) {
  return (
    <View style={styles.childItem}>
      <Image source={image} style={styles.childImage} />
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
        <ThemedText style={styles.connectButtonText}>Connect</ThemedText>
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
  const sections = [
    {
      title: 'Online Players',
      items: [
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'John Doe',
          status: 'Looking for a game',
        },
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'Jane Smith',
          status: 'Available for chat',
        },
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'Mike Johnson',
          status: 'In a game',
        },
      ],
    },
    {
      title: 'Nearby Players',
      items: [
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'Sarah Wilson',
          status: 'At Local Game Store',
        },
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'Tom Brown',
          status: 'Hosting a game night',
        },
      ],
    },
    {
      title: 'Friends',
      items: [
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'Alex Davis',
          status: 'Online',
        },
        {
          image: require('@/assets/images/partial-react-logo.png'),
          name: 'Emma White',
          status: 'Offline',
        },
      ],
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Connect</ThemedText>
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
}); 