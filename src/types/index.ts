
import type { ImageSourcePropType } from 'react-native';

// informacion de la mascota
export type Pet = {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
  breed: string;
  ageMonths: number;
  sex: 'female' | 'male';
  size: 'small' | 'medium' | 'large';
  description: string;
  photo: ImageSourcePropType;
  vaccinated: boolean;
  sterilized: boolean;
  status: 'available' | 'in_process' | 'adopted';
};

