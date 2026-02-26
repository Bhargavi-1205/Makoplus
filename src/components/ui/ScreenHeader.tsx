import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
  rightElement?: ReactNode;
}

export default function ScreenHeader({ title, onBack, rightElement }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 8 }]}>
      <Pressable style={styles.back} onPress={onBack}>
        <Text style={styles.arrow}>←</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{rightElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: colors.deep,
    fontSize: 16,
  },
  title: {
    color: colors.deep,
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  right: {
    minWidth: 24,
    alignItems: 'flex-end',
  },
});


