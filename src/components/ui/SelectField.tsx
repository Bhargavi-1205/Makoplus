import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../../theme/colors';

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function SelectField({ label, value, options, onSelect, placeholder }: SelectFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={[styles.triggerText, !value && styles.placeholder]}>{value || placeholder || 'Select an option'}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalCard}>
            <ScrollView>
              {options.map((option) => (
                <Pressable
                  key={option}
                  style={styles.optionRow}
                  onPress={() => {
                    onSelect(option);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.muted,
    marginBottom: 8,
  },
  trigger: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.skin,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triggerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: colors.deep,
    flex: 1,
  },
  placeholder: {
    color: colors.muted,
  },
  chevron: {
    color: colors.muted,
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.32)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    maxHeight: 340,
    overflow: 'hidden',
  },
  optionRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontFamily: 'Inter_500Medium',
    color: colors.deep,
    fontSize: 14,
  },
});

