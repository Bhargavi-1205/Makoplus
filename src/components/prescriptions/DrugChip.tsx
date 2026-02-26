import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface DrugChipProps {
  label: string;
}

export default function DrugChip({ label }: DrugChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.mintLight,
    borderWidth: 1,
    borderColor: colors.mint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
  },
});

