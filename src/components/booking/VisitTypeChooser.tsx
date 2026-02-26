import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface VisitTypeChooserProps {
  value: 'fresh' | 'followup';
  onChange: (value: 'fresh' | 'followup') => void;
}

function Chip({
  selected,
  icon,
  title,
  subtitle,
  onPress,
}: {
  selected: boolean;
  icon: 'sparkles-outline' | 'repeat-outline';
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Ionicons name={icon} size={16} color={colors.deep} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export default function VisitTypeChooser({ value, onChange }: VisitTypeChooserProps) {
  return (
    <View style={styles.row}>
      <Chip
        selected={value === 'fresh'}
        icon="sparkles-outline"
        title="Fresh Visit"
        subtitle="First time / new concern"
        onPress={() => onChange('fresh')}
      />
      <Chip
        selected={value === 'followup'}
        icon="repeat-outline"
        title="Follow-up"
        subtitle="Continuing treatment"
        onPress={() => onChange('followup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  chip: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.skin,
    alignItems: 'center',
  },
  chipSelected: {
    borderColor: colors.terra,
    backgroundColor: colors.blush,
  },
  icon: {
    marginBottom: 6,
  },
  title: {
    color: colors.deep,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  subtitle: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});

