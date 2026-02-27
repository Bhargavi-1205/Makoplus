import { IntakeFormData, Appointment } from '../types';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: { phoneNumber: string; mode: 'patient' | 'guardian' };
};

export type MainTabParamList = {
  Home: undefined;
  Book: undefined;
  Prescriptions: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Booking: undefined;
  Intake: {
    visitType: 'fresh' | 'followup';
    doctorId: string;
    date: string;
    time: string;
    profileId: string;
  };
  Confirm: {
    intakeData: IntakeFormData;
    appointmentDetails: Partial<Appointment>;
  };
  AddProfile: undefined;
  RecentVisits: undefined;
  VisitDetails: {
    visitId: string;
  };
  SkinTracker: undefined;
  Reminders: undefined;
};
