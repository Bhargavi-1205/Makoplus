import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../components/ui/ScreenHeader';
import { useAppointments } from '../context/AppointmentsContext';
import { useProfile } from '../context/ProfileContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'VisitDetails'>;

export default function VisitDetailsScreen({ navigation, route }: Props) {
  const { activeProfile } = useProfile();
  const { appointments } = useAppointments();
  const visit = appointments.find((item) => item.id === route.params.visitId);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Visit Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {!visit ? (
          <Text style={styles.empty}>Visit not found.</Text>
        ) : (
          <View style={styles.card}>
            <Text style={styles.title}>{visit.chiefConcern}</Text>
            <Text style={styles.subtitle}>{activeProfile.name}</Text>
            <Row label="Doctor" value={visit.doctor.name} />
            <Row label="Specialty" value={visit.doctor.specialty} />
            <Row label="Date" value={visit.date} />
            <Row label="Time" value={visit.time} />
            <Row label="Visit Type" value={visit.visitType === 'followup' ? 'Follow-up' : 'Fresh'} />
            <Row label="Booking ID" value={visit.bookingId} />
            <Row label="Status" value={visit.status} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.key}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
  },
  card: {
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
  },
  title: {
    color: colors.deep,
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
  },
  row: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  key: {
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
  },
  value: {
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
    flexShrink: 1,
    textAlign: 'right',
  },
  empty: {
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
  },
});
