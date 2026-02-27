import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Appointment } from '../../types';
import { colors } from '../../theme/colors';
import { PrimaryButton } from '../ui/Button';

interface NextAppointmentCardProps {
  appointment?: Appointment;
  onBook: () => void;
}

export default function NextAppointmentCard({ appointment, onBook }: NextAppointmentCardProps) {
  return (
    <LinearGradient colors={['#1E3A8A', colors.terra]} style={styles.card}>
      <MaterialCommunityIcons name="leaf" size={72} color="rgba(255,255,255,0.12)" style={styles.leaf} />
      <Text style={styles.label}>NEXT APPOINTMENT</Text>
      {appointment ? (
        <>
          <Text style={styles.date}>
            {appointment.date} · {appointment.time}
          </Text>
          <Text style={styles.doctor}>
            {appointment.doctor.name} · {appointment.doctor.specialty}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {appointment.visitType === 'followup' ? 'Follow-up' : 'Fresh'} · {appointment.chiefConcern}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.noTitle}>No upcoming appointments</Text>
          <View style={{ marginTop: 12 }}>
            <PrimaryButton label="Book Now" onPress={onBook} />
          </View>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    marginHorizontal: 4,
    marginBottom: 6,
    borderRadius: 18,
    padding: 18,
    overflow: 'hidden',
  },
  leaf: {
    position: 'absolute',
    right: -8,
    bottom: -8,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.white,
    opacity: 0.7,
    fontFamily: 'Inter_500Medium',
  },
  date: {
    marginTop: 8,
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  doctor: {
    marginTop: 4,
    color: colors.white,
    opacity: 0.85,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  badge: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  noTitle: {
    marginTop: 8,
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
});

