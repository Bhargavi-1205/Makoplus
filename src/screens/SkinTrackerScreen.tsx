import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../components/ui/ScreenHeader';
import { useAppointments } from '../context/AppointmentsContext';
import { useProfile } from '../context/ProfileContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'SkinTracker'>;

export default function SkinTrackerScreen({ navigation }: Props) {
  const { activeProfile } = useProfile();
  const { appointments } = useAppointments();
  const completed = appointments.filter((a) => a.profileId === activeProfile.id && a.status === 'completed');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Skin Tracker" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{activeProfile.name} · Progress timeline</Text>

        {completed.length > 0 ? (
          completed.map((item, index) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>Check-in {index + 1}</Text>
              <Text style={styles.text}>{item.date}</Text>
              <Text style={styles.text}>{item.chiefConcern}</Text>
              <Text style={styles.note}>Use each follow-up to compare changes over time.</Text>
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.title}>No entries yet</Text>
            <Text style={styles.note}>Book and complete a visit to start your skin progress timeline.</Text>
          </View>
        )}
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
    gap: 10,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  card: {
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
  },
  title: {
    color: colors.deep,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  text: {
    marginTop: 4,
    color: colors.deep,
    fontFamily: 'Inter_400Regular',
  },
  note: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
