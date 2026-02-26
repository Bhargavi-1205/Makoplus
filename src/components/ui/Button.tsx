import * as Haptics from 'expo-haptics';
import { PropsWithChildren, useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface OutlineButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

function AnimatedPressable({ children, onPress, disabled, style }: PropsWithChildren<{ onPress: () => void; disabled?: boolean; style: object }>) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable disabled={disabled} onPress={handlePress} style={style}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

export function PrimaryButton({ label, onPress, loading, disabled }: PrimaryButtonProps) {
  return (
    <AnimatedPressable onPress={onPress} disabled={disabled || loading} style={[styles.primary, (disabled || loading) && styles.disabled]}>
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryText}>{label}</Text>}
    </AnimatedPressable>
  );
}

export function OutlineButton({ label, onPress, disabled }: OutlineButtonProps) {
  return (
    <AnimatedPressable onPress={onPress} disabled={disabled} style={[styles.outline, disabled && styles.disabled]}>
      <Text style={styles.outlineText}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.terra,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  outline: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: colors.terra,
    backgroundColor: colors.skin,
  },
  outlineText: {
    color: colors.terra,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  disabled: {
    opacity: 0.5,
  },
});

