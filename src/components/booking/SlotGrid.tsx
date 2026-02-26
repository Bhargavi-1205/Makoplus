import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TimeSlot } from '../../types';
import { colors } from '../../theme/colors';

interface SlotGridProps {
  slots: TimeSlot[];
  selectedTime: string;
  onSelect: (time: string) => void;
}

export default function SlotGrid({ slots, selectedTime, onSelect }: SlotGridProps) {
  return (
    <View style={styles.grid}>
      {slots.map((slot) => {
        const selected = selectedTime === slot.time;
        return (
          <Pressable
            key={slot.time}
            disabled={!slot.available}
            onPress={() => onSelect(slot.time)}
            style={[styles.slot, selected && styles.selected, !slot.available && styles.unavailable]}
          >
            <Text style={[styles.slotText, selected && styles.selectedText, !slot.available && styles.unavailableText]}>
              {slot.time}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slot: {
    width: '31%',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.skin,
    alignItems: 'center',
  },
  slotText: {
    color: colors.deep,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  selected: {
    backgroundColor: colors.terra,
    borderColor: colors.terra,
  },
  selectedText: {
    color: colors.white,
  },
  unavailable: {
    opacity: 0.4,
  },
  unavailableText: {
    textDecorationLine: 'line-through',
  },
});


