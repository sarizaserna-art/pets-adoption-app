import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PetCard } from '../components/PetCard';
import { PETS } from '../data/mockData';
import type { Pet } from '../types';

export function HomeScreen(): React.JSX.Element {
  const handlePress = (pet: Pet): void => {
    Alert.alert(pet.name, pet.description);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>🐾 Huellitas</Text>
        <Text style={styles.subtitle}>Centro de adopción de mascotas</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} onPress={handlePress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  list: {
    padding: 16,
  },
});
