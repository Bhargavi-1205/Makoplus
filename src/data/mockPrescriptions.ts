import { Prescription } from '../types';
import { mockDoctors } from './mockDoctors';

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx1',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'Feb 12, 2026',
    visitType: 'followup',
    diagnosis: 'Acne Vulgaris (Moderate)',
    drugs: ['Clindamycin 1% gel · BD', 'Doxycycline 100mg · OD × 6 wk', 'SPF 50 sunscreen'],
    status: 'active',
    nextReview: 'March 4, 2026',
  },
  {
    id: 'rx2',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'Jan 18, 2026',
    visitType: 'fresh',
    diagnosis: 'Hair Fall (Telogen Effluvium)',
    drugs: ['Minoxidil 5% · OD', 'Biotin 10mg · OD', 'Ferrous Sulphate'],
    status: 'completed',
  },
  {
    id: 'rx3',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'Dec 5, 2025',
    visitType: 'followup',
    diagnosis: 'Atopic Dermatitis',
    drugs: ['Tacrolimus 0.1% oint · BD', 'Cetirizine 10mg · HS', 'Moisturizer'],
    status: 'completed',
  },
];

