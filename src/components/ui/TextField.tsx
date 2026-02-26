import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../../theme/colors';

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  minHeight?: number;
}

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  minHeight,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && { minHeight: minHeight ?? 80 }, focused && styles.focused]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={colors.muted}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.muted,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: 'Inter_400Regular',
    color: colors.deep,
    fontSize: 14,
  },
  focused: {
    borderColor: colors.terra,
  },
});

