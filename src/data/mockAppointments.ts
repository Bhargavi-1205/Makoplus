import { Appointment } from '../types';
import { mockDoctors } from './mockDoctors';

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'March 4, 2026',
    time: '11:30 AM',
    visitType: 'followup',
    chiefConcern: 'Acne Treatment',
    status: 'upcoming',
    bookingId: 'MK-2026-04821',
  },
  {
    id: 'a2',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'Feb 12, 2026',
    time: '10:00 AM',
    visitType: 'followup',
    chiefConcern: 'Acne + Pigmentation',
    status: 'completed',
    bookingId: 'MK-2026-03741',
  },
  {
    id: 'a3',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'Jan 18, 2026',
    time: '11:00 AM',
    visitType: 'fresh',
    chiefConcern: 'Hair Fall Assessment',
    status: 'completed',
    bookingId: 'MK-2026-02190',
  },
  {
    id: 'a4',
    profileId: 'p1',
    doctor: mockDoctors[0],
    date: 'Dec 5, 2025',
    time: '9:30 AM',
    visitType: 'followup',
    chiefConcern: 'Eczema Check',
    status: 'completed',
    bookingId: 'MK-2025-08812',
  },
];

