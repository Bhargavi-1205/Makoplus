import { StyleSheet, Text, View } from 'react-native';
import { Prescription } from '../../types';
import { colors } from '../../theme/colors';
import DrugChip from './DrugChip';

interface PrescriptionCardProps {
  item: Prescription;
}

export default function PrescriptionCard({ item }: PrescriptionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.doctor}>{item.doctor.name}</Text>
          <Text style={styles.meta}>
            {item.visitType === 'followup' ? 'Follow-up' : 'Fresh'} · {item.date}
          </Text>
        </View>
        <View style={[styles.badge, item.status === 'active' ? styles.active : styles.completed]}>
          <Text style={[styles.badgeText, item.status === 'active' ? styles.activeText : styles.completedText]}>
            {item.status === 'active' ? 'Active' : 'Completed'}
          </Text>
        </View>
      </View>

      <Text style={styles.diagnosis}>{item.diagnosis}</Text>

      <View style={styles.drugsRow}>
        {item.drugs.map((drug) => (
          <DrugChip key={drug} label={drug} />
        ))}
      </View>

      {item.nextReview ? <Text style={styles.review}>Next review: {item.nextReview}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  doctor: {
    color: colors.deep,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  meta: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  active: {
    backgroundColor: colors.terra,
  },
  completed: {
    backgroundColor: colors.border,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  activeText: {
    color: colors.white,
  },
  completedText: {
    color: colors.muted,
  },
  diagnosis: {
    marginVertical: 10,
    color: colors.terra,
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  drugsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  review: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});


