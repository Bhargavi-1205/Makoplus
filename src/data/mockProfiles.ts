import { Profile } from '../types';

export const mockProfiles: Profile[] = [
  {
    id: 'p1',
    name: 'Priya Sharma',
    relation: 'self',
    age: 32,
    gender: 'female',
    emoji: '👩',
    avatarGradient: ['#93C5FD', '#2563EB'],
    bloodGroup: 'B+',
    isGuardianDependent: false,
  },
  {
    id: 'p2',
    name: 'Arjun',
    relation: 'child',
    age: 8,
    gender: 'male',
    emoji: '👦',
    avatarGradient: ['#BFDBFE', '#3B82F6'],
    isGuardianDependent: true,
  },
  {
    id: 'p3',
    name: 'Father',
    relation: 'parent',
    age: 61,
    gender: 'male',
    emoji: '👴',
    avatarGradient: ['#60A5FA', '#1D4ED8'],
    isGuardianDependent: false,
  },
];

