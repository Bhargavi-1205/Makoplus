import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';

interface StepIndicatorProps {
  total: number;
  current: number;
}

export default function StepIndicator({ total, current }: StepIndicatorProps) {
  const widths = useRef(Array.from({ length: total }, (_, i) => new Animated.Value(i + 1 < current ? 24 : 8))).current;

  useEffect(() => {
    widths.forEach((value, index) => {
      Animated.timing(value, {
        toValue: index + 1 < current ? 24 : 8,
        duration: 220,
        useNativeDriver: false,
      }).start();
    });
  }, [current, widths]);

  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index + 1 === current;
        const isFuture = index + 1 > current;
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { width: widths[index] },
              isFuture ? styles.future : styles.done,
              isActive && styles.active,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  done: {
    backgroundColor: colors.terra,
  },
  active: {
    width: 8,
  },
  future: {
    backgroundColor: colors.border,
  },
});


