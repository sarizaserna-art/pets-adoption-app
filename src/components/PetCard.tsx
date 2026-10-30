import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Pet } from '../types';


//contenido de las variables 
interface PetCardProps {
  pet: Pet;
  onPress: (pet: Pet) => void;
}

const SPECIES_EMOJI: Record<Pet['species'], string> = {
  dog: '🐶',
  cat: '🐱',
  rabbit: '🐰',
  bird: '🐦',
  other: '🐾',
};

const STATUS_LABEL: Record<Pet['status'], string> = {
  available: 'Disponible',
  in_process: 'En proceso',
  adopted: 'Adoptado',
};

function formatAge(ageMonths: number): string {
  if (ageMonths < 12) {
    return `${ageMonths} ${ageMonths === 1 ? 'mes' : 'meses'}`;
  }
  const years = Math.floor(ageMonths / 12);
  return `${years} ${years === 1 ? 'año' : 'años'}`;
}

export function PetCard({ pet, onPress }: PetCardProps): React.JSX.Element {
  const isAvailable = pet.status === 'available';

  return (
    <Pressable
      onPress={() => onPress(pet)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={pet.photo} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {SPECIES_EMOJI[pet.species]} {pet.name}
          </Text>
          <View style={[styles.badge, isAvailable ? styles.badgeAvailable : styles.badgeOther]}>
            <Text style={styles.badgeText}>{STATUS_LABEL[pet.status]}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          {pet.breed} · {formatAge(pet.ageMonths)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 180,
  },
  body: {
    padding: 12,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeAvailable: {
    backgroundColor: '#D1FAE5',
  },
  badgeOther: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
});