export type Species = 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
export type Sex = 'male' | 'female';
export type Size = 'small' | 'medium' | 'large';
export type AdoptionStatus = 'available' | 'in_process' | 'adopted';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  ageMonths: number;
  sex: Sex;
  size: Size;
  description: string;
  photoUrl: string;
  vaccinated: boolean;
  sterilized: boolean;
  status: AdoptionStatus;
}
