import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../components/ui/ScreenHeader';
import { useProfile } from '../context/ProfileContext';
import { mockPrescriptions } from '../data/mockPrescriptions';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Reminders'>;

export default function RemindersScreen({ navigation }: Props) {
  const { activeProfile } = useProfile();
  const activePrescriptions = mockPrescriptions.filter((item) => item.profileId === activeProfile.id && item.status === 'active');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Reminders" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{activeProfile.name} · Medication reminders</Text>

        {activePrescriptions.length > 0 ? (
          activePrescriptions.map((prescription) => (
            <View key={prescription.id} style={styles.card}>
              <Text style={styles.title}>{prescription.diagnosis}</Text>
              {prescription.drugs.map((drug) => (
                <View key={drug} style={styles.row}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.drug}>{drug}</Text>
                </View>
              ))}
              {prescription.nextReview ? <Text style={styles.nextReview}>Next review: {prescription.nextReview}</Text> : null}
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.title}>No active reminders</Text>
            <Text style={styles.nextReview}>Active prescriptions will appear here.</Text>
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
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  bullet: {
    color: colors.terra,
    fontFamily: 'Inter_700Bold',
  },
  drug: {
    flex: 1,
    color: colors.deep,
    fontFamily: 'Inter_400Regular',
  },
  nextReview: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
