import { CalendarDay, TimeSlot } from '../types';

export const getMockCalendarDays = (): CalendarDay[] => [
  { date: new Date('2026-03-03'), dayName: 'Mon', dayNum: 3, availableSlots: 2 },
  { date: new Date('2026-03-04'), dayName: 'Tue', dayNum: 4, availableSlots: 3 },
  { date: new Date('2026-03-05'), dayName: 'Wed', dayNum: 5, availableSlots: 1 },
  { date: new Date('2026-03-06'), dayName: 'Thu', dayNum: 6, availableSlots: 2 },
  { date: new Date('2026-03-07'), dayName: 'Fri', dayNum: 7, availableSlots: 0 },
  { date: new Date('2026-03-08'), dayName: 'Sat', dayNum: 8, availableSlots: 3 },
];

export const getMockTimeSlots = (): TimeSlot[] => [
  { time: '9:00 AM', available: false },
  { time: '9:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:30 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '2:00 PM', available: false },
  { time: '3:00 PM', available: true },
  { time: '4:30 PM', available: true },
];

