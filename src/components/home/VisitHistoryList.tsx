import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Appointment } from '../../types';

interface VisitHistoryListProps {
  visits: Appointment[];
  onPressDetails: (visitId: string) => void;
}

const DOT_COLORS = [colors.terra, colors.mint, colors.blush];

export default function VisitHistoryList({ visits, onPressDetails }: VisitHistoryListProps) {
  return (
    <View>
      {visits.map((visit, index) => (
        <View key={visit.id} style={styles.card}>
          <View style={[styles.dot, { backgroundColor: DOT_COLORS[index % DOT_COLORS.length] }]} />
          <View style={styles.info}>
            <Text style={styles.title}>{visit.doctor.name}</Text>
            <Text style={styles.subtitle}>
              {visit.chiefConcern} · {visit.visitType === 'followup' ? 'Follow-up' : 'Fresh'}
            </Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.date}>{visit.date}</Text>
            <Pressable onPress={() => onPressDetails(visit.id)}>
              <Text style={styles.details}>→ Details</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
  },
  dateCol: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
  },
  details: {
    marginTop: 2,
    fontSize: 10,
    color: colors.terra,
    fontFamily: 'Inter_500Medium',
  },
});


