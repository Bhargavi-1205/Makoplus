export interface Profile {
  id: string;
  name: string;
  relation: 'self' | 'child' | 'parent' | 'spouse' | 'other';
  age: number;
  gender: 'male' | 'female' | 'other';
  emoji: string;
  avatarGradient: [string, string];
  bloodGroup?: string;
  isGuardianDependent: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface CalendarDay {
  date: Date;
  dayName: string;
  dayNum: number;
  availableSlots: number;
}

export interface Appointment {
  id: string;
  profileId: string;
  doctor: Doctor;
  date: string;
  time: string;
  visitType: 'fresh' | 'followup';
  chiefConcern: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingId: string;
}

export interface Prescription {
  id: string;
  profileId: string;
  doctor: Doctor;
  date: string;
  visitType: 'fresh' | 'followup';
  diagnosis: string;
  drugs: string[];
  status: 'active' | 'completed';
  nextReview?: string;
}

export interface IntakeFormData {
  profileId: string;
  visitType: 'fresh' | 'followup';
  chiefConcern: string;
  description: string;
  duration: string;
  severity: string;
  usingTopicalCreams: boolean;
  itchingOrBurning: boolean;
  worsensInSunlight: boolean;
  familyHistorySkin: boolean;
  pregnantOrBreastfeeding: boolean;
  currentMedications: string;
  knownAllergies: string;
  photos: string[];
  progressSinceLastVisit?: string;
}

