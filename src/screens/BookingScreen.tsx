import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { useMemo, useState } from 'react';
import ScreenHeader from '../components/ui/ScreenHeader';
import StepIndicator from '../components/ui/StepIndicator';
import SelectField from '../components/ui/SelectField';
import VisitTypeChooser from '../components/booking/VisitTypeChooser';
import CalendarStrip from '../components/booking/CalendarStrip';
import SlotGrid from '../components/booking/SlotGrid';
import { PrimaryButton } from '../components/ui/Button';
import { getMockCalendarDays, getMockTimeSlots } from '../data/mockSlots';
import { mockDoctors } from '../data/mockDoctors';
import { useProfile } from '../context/ProfileContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { format } from 'date-fns';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

const calendarDays = getMockCalendarDays();
const slots = getMockTimeSlots();

export default function BookingScreen({ navigation }: Props) {
  const { profiles, activeProfile } = useProfile();
  const [selectedProfileId, setSelectedProfileId] = useState(activeProfile.id);
  const [visitType, setVisitType] = useState<'fresh' | 'followup'>('followup');
  const [selectedDoctorId, setSelectedDoctorId] = useState('d1');
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [selectedTime, setSelectedTime] = useState('11:30 AM');

  const selectedDate = useMemo(() => calendarDays[selectedDayIndex].date, [selectedDayIndex]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScreenHeader title="Book Appointment" onBack={() => navigation.goBack()} />
      <StepIndicator total={3} current={1} />
      <ScrollView contentContainerStyle={styles.content}>
        <SelectField
          label="Booking For"
          value={profiles.find((p) => p.id === selectedProfileId)?.name ?? ''}
          onSelect={(name) => {
            const next = profiles.find((p) => p.name === name);
            if (next) {
              setSelectedProfileId(next.id);
            }
          }}
          options={profiles.map((p) => p.name)}
        />

        <Text style={styles.label}>Visit Type</Text>
        <VisitTypeChooser value={visitType} onChange={setVisitType} />

        <SelectField
          label="Select Doctor"
          value={selectedDoctorId === 'any' ? 'Any Available Doctor' : mockDoctors.find((doc) => doc.id === selectedDoctorId)?.name ?? ''}
          onSelect={(name) => {
            if (name === 'Any Available Doctor') {
              setSelectedDoctorId('any');
              return;
            }
            const doctor = mockDoctors.find((doc) => doc.name === name);
            if (doctor) {
              setSelectedDoctorId(doctor.id);
            }
          }}
          options={['Any Available Doctor', ...mockDoctors.map((doc) => doc.name)]}
        />

        <Text style={styles.label}>Choose a Date</Text>
        <CalendarStrip days={calendarDays} selectedIndex={selectedDayIndex} onSelect={setSelectedDayIndex} />

        <Text style={[styles.label, { marginTop: 14 }]}>Available Slots · {format(selectedDate, 'EEE, MMM d')}</Text>
        <SlotGrid slots={slots} selectedTime={selectedTime} onSelect={setSelectedTime} />

        <PrimaryButton
          label="Next: Pre-visit Info →"
          onPress={() =>
            navigation.navigate('Intake', {
              visitType,
              doctorId: selectedDoctorId,
              date: format(selectedDate, 'MMMM d, yyyy'),
              time: selectedTime,
              profileId: selectedProfileId,
            })
          }
          disabled={!selectedTime}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.muted,
    marginBottom: 8,
  },
});


