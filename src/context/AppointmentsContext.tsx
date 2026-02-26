import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { mockAppointments } from '../data/mockAppointments';
import { Appointment } from '../types';

const APPOINTMENTS_KEY = 'makoplus_appointments';

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => Promise<void>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export function AppointmentsProvider({ children }: PropsWithChildren) {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(APPOINTMENTS_KEY);
      if (!raw) {
        return;
      }
      try {
        const parsed = JSON.parse(raw) as Appointment[];
        setAppointments(parsed);
      } catch {
        setAppointments(mockAppointments);
      }
    })();
  }, []);

  const addAppointment = async (appointment: Appointment) => {
    setAppointments((prev) => {
      const next = [appointment, ...prev.filter((item) => item.id !== appointment.id)];
      AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(() => ({ appointments, addAppointment }), [appointments]);

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>;
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error('useAppointments must be used within AppointmentsProvider');
  }
  return ctx;
}

