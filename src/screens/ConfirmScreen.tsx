import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../components/ui/ScreenHeader';
import { PrimaryButton } from '../components/ui/Button';
import { useAppointments } from '../context/AppointmentsContext';
import { useProfile } from '../context/ProfileContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

export default function ConfirmScreen({ route, navigation }: Props) {
  const { intakeData, appointmentDetails } = route.params;
  const { addAppointment } = useAppointments();
  const { profiles } = useProfile();

  const bookingId = useMemo(() => `MK-2026-${Math.floor(10000 + Math.random() * 89999)}`, []);
  const profile = profiles.find((p) => p.id === intakeData.profileId) ?? profiles[0];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Confirmed! 🎉" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.confirmCard}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.topLabel}>APPOINTMENT BOOKED</Text>
          <Text style={styles.date}>{appointmentDetails.date}</Text>
          <Text style={styles.timeDoctor}>
            {appointmentDetails.time} · {appointmentDetails.doctor?.name}
          </Text>
          <View style={styles.bookingBox}>
            <Text style={styles.bookingLabel}>Booking ID</Text>
            <Text style={styles.bookingValue}>{bookingId}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          {[
            ['Patient', profile.name],
            ['Visit Type', intakeData.visitType === 'followup' ? 'Follow-up' : 'Fresh'],
            ['Chief Concern', intakeData.chiefConcern],
            ['Doctor', appointmentDetails.doctor?.name ?? 'Any Available Doctor'],
            ['Location', 'MakoPlus HSR Layout'],
            ['Reminders', 'SMS + WhatsApp ✓'],
          ].map(([key, value], index, arr) => (
            <View key={key} style={[styles.detailRow, index === arr.length - 1 && styles.lastRow]}>
              <Text style={styles.detailKey}>{key}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            📌 <Text style={styles.bold}>Arrive 10 mins early.</Text> Please bring any previous prescriptions or lab reports.
          </Text>
        </View>

        <PrimaryButton
          label="Back to Home"
          onPress={async () => {
            await addAppointment({
              id: `a-${Date.now()}`,
              profileId: intakeData.profileId,
              doctor: appointmentDetails.doctor!,
              date: appointmentDetails.date!,
              time: appointmentDetails.time!,
              visitType: intakeData.visitType,
              chiefConcern: intakeData.chiefConcern,
              status: 'upcoming',
              bookingId,
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.popToTop();
            navigation.navigate('MainTabs');
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  confirmCard: {
    backgroundColor: colors.deep,
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    position: 'relative',
  },
  checkCircle: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
  },
  topLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.blush,
    fontFamily: 'Inter_500Medium',
  },
  date: {
    marginTop: 8,
    color: colors.skin,
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  timeDoctor: {
    marginTop: 4,
    color: colors.skin,
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
  bookingBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  bookingLabel: {
    fontSize: 12,
    color: colors.skin,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  bookingValue: {
    marginTop: 2,
    fontSize: 15,
    color: colors.white,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1,
  },
  detailsCard: {
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 10,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  detailKey: {
    color: colors.muted,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  detailValue: {
    color: colors.deep,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'right',
    flex: 1,
  },
  note: {
    backgroundColor: colors.mintLight,
    borderWidth: 1,
    borderColor: colors.mint,
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
  },
  noteText: {
    color: colors.deep,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  bold: {
    fontFamily: 'Inter_500Medium',
  },
});

