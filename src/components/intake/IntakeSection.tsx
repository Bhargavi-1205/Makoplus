import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface IntakeSectionProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
}

export default function IntakeSection({ iconName, title, children }: PropsWithChildren<IntakeSectionProps>) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name={iconName} size={18} color={colors.deep} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: colors.deep,
  },
});

