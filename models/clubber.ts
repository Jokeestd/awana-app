// Clubber represents a child/member
export type Gender = 'male' | 'female';

export interface Clubber {
  id: string;
  name: string;
  team: string; // e.g., "Llamas" o "Antorchas"
  gender: Gender;
}