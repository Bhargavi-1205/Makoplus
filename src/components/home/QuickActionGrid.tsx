import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface QuickAction {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  variant?: 'mint' | 'default';
  onPress: () => void;
}

interface QuickActionGridProps {
  actions: QuickAction[];
}

function ActionCard({ action }: { action: QuickAction }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    action.onPress();
  };

  return (
    <Animated.View style={{ width: '48%', transform: [{ scale }] }}>
      <Pressable onPress={handlePress} style={[styles.card, action.variant === 'mint' && styles.mintCard]}>
        <View style={styles.icon}>{action.icon}</View>
        <Text style={styles.title}>{action.title}</Text>
        <Text style={styles.subtitle}>{action.subtitle}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function QuickActionGrid({ actions }: QuickActionGridProps) {
  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.skin,
    minHeight: 132,
  },
  mintCard: {
    backgroundColor: colors.mintLight,
    borderColor: colors.mint,
  },
  icon: {
    marginBottom: 10,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: colors.deep,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  subtitle: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});

