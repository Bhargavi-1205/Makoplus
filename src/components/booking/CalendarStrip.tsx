import { useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarDay } from '../../types';
import { colors } from '../../theme/colors';

interface CalendarStripProps {
  days: CalendarDay[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function CalendarStrip({ days, selectedIndex, onSelect }: CalendarStripProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handleSelect = (index: number) => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    onSelect(index);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {days.map((day, index) => {
        const selected = index === selectedIndex;
        const disabled = day.availableSlots === 0;

        return (
          <Animated.View key={day.date.toISOString()} style={{ transform: [{ scale }] }}>
            <Pressable
              disabled={disabled}
              onPress={() => handleSelect(index)}
              style={[styles.tile, selected && styles.tileSelected, disabled && styles.disabled]}
            >
              <Text style={[styles.dayName, selected && styles.selectedText]}>{day.dayName.toUpperCase()}</Text>
              <Text style={[styles.dayNum, selected && styles.selectedText]}>{day.dayNum}</Text>
              <View style={styles.dotsRow}>
                {Array.from({ length: Math.max(day.availableSlots, 1) }).map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[styles.dot, day.availableSlots === 0 && styles.dotDisabled, selected && styles.selectedDot]}
                  />
                ))}
              </View>
            </Pressable>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 10,
    paddingBottom: 4,
  },
  tile: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  tileSelected: {
    backgroundColor: colors.terra,
    borderColor: colors.terra,
  },
  disabled: {
    opacity: 0.4,
  },
  dayName: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.5,
  },
  dayNum: {
    fontSize: 20,
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
  },
  selectedText: {
    color: colors.white,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.mint,
  },
  selectedDot: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  dotDisabled: {
    backgroundColor: colors.booked,
  },
});


