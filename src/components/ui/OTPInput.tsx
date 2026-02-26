import { useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';

interface OTPInputProps {
  onChangeValue: (value: string) => void;
}

export default function OTPInput({ onChangeValue }: OTPInputProps) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const refs = useRef<Array<TextInput | null>>([]);

  const value = useMemo(() => digits.join(''), [digits]);

  const updateDigit = (index: number, next: string) => {
    const clean = next.replace(/\D/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = clean;
    setDigits(nextDigits);
    onChangeValue(nextDigits.join(''));
    if (clean && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            refs.current[index] = ref;
          }}
          value={digit}
          onFocus={() => setFocusedIndex(index)}
          onChangeText={(text) => updateDigit(index, text)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
              refs.current[index - 1]?.focus();
            }
          }}
          autoComplete={index === 0 ? 'sms-otp' : 'off'}
          keyboardType="number-pad"
          maxLength={1}
          style={[styles.box, focusedIndex === index && styles.focused]}
        />
      ))}
      <TextInput value={value} editable={false} style={{ width: 0, height: 0 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  box: {
    width: 48,
    height: 54,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.skin,
    textAlign: 'center',
    fontSize: 22,
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
  },
  focused: {
    borderColor: colors.terra,
  },
});


