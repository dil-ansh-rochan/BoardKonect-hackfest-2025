import React from 'react';
import { StyleSheet, View, Image, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface ProfileInfo {
  name: string;
  email: string;
  country: string;
  company: string;
  branch: string;
  position: string;
}

// Sample profile data - replace with actual user data
const profileData: ProfileInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  country: 'United States',
  company: 'Tech Corp',
  branch: 'San Francisco',
  position: 'Senior Developer',
};

export default function ProfileScreen() {
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    router.replace('/login');
  };

  const renderProfileField = (label: string, value: string) => (
    <View style={styles.fieldContainer}>
      <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
      <ThemedText style={styles.fieldValue}>{value}</ThemedText>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <ThemedText style={styles.name}>{profileData.name}</ThemedText>
      </View>

      <View style={styles.content}>
        {renderProfileField('Email', profileData.email)}
        {renderProfileField('Country', profileData.country)}
        {renderProfileField('Company', profileData.company)}
        {renderProfileField('Branch', profileData.branch)}
        {renderProfileField('Position', profileData.position)}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  fieldContainer: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 