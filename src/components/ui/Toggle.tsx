import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../../theme/colors';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ value, onChange }: ToggleProps) {
  const x = useRef(new Animated.Value(value ? 18 : 0)).current;

  useEffect(() => {
    Animated.spring(x, { toValue: value ? 18 : 0, useNativeDriver: false }).start();
  }, [value, x]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(!value);
  };

  return (
    <Pressable onPress={handlePress} style={[styles.track, value ? styles.trackOn : styles.trackOff]}>
      <Animated.View style={[styles.thumb, { transform: [{ translateX: x }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  trackOn: {
    backgroundColor: colors.terra,
  },
  trackOff: {
    backgroundColor: colors.border,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});


