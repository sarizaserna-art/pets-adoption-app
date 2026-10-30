//esto  es como la pantalla q da detalles de las mascotas 
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PETS } from '../data/mockData';
import type { HomeStackParamList } from '../types/navigation.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'PetDetail'>;

export function DetailScreen({ route }: Props): React.JSX.Element {
  const { petId } = route.params;
  const pet = PETS.find((item) => item.id === petId);

  if (!pet) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Mascota no encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={pet.photo} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.breed}>{pet.breed}</Text>

          <Text style={styles.sectionTitle}>Sobre mí</Text>
          <Text style={styles.description}>{pet.description}</Text>

          <Text style={styles.sectionTitle}>Información</Text>

          <Text style={styles.info}>Edad: {pet.ageMonths} meses</Text>
          <Text style={styles.info}>Sexo: {pet.sex === 'female' ? 'Hembra' : 'Macho'}</Text>
          <Text style={styles.info}>Tamaño: {pet.size}</Text>
          <Text style={styles.info}>
            Vacunado: {pet.vaccinated ? 'Sí' : 'No'}
          </Text>
          <Text style={styles.info}>
            Esterilizado: {pet.sterilized ? 'Sí' : 'No'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },
  breed: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },
});
