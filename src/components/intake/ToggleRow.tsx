import { StyleSheet, Text, View } from 'react-native';
import Toggle from '../ui/Toggle';
import { colors } from '../../theme/colors';

interface ToggleRowProps {
  label: string;
  sublabel?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  last?: boolean;
}

export default function ToggleRow({ label, sublabel, value, onChange, last }: ToggleRowProps) {
  return (
    <View style={[styles.row, last && styles.last]}>
      <View style={styles.left}>
        <Text style={styles.label}>{label}</Text>
        {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      </View>
      <Toggle value={value} onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  last: {
    borderBottomWidth: 0,
  },
  left: {
    flex: 1,
  },
  label: {
    color: colors.deep,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  sublabel: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});


