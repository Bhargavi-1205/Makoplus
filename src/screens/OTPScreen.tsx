import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import OTPInput from '../components/ui/OTPInput';
import { PrimaryButton } from '../components/ui/Button';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export default function OTPScreen({ route, navigation }: Props) {
  const { phoneNumber, mode } = route.params;
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          Sent to <Text style={styles.phone}>{phoneNumber}</Text>
        </Text>
        <View style={{ marginTop: 24 }}>
          <OTPInput onChangeValue={setOtp} />
        </View>
        <View style={{ marginTop: 24 }}>
          <PrimaryButton
            label="Verify & Login →"
            disabled={otp.length !== 6}
            onPress={async () => {
              await login(phoneNumber, mode);
            }}
          />
        </View>
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive?</Text>
          <Text style={styles.resendLink}>
            {countdown > 0 ? ` Resend in 0:${String(countdown).padStart(2, '0')}` : ' Resend OTP'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingTop: 18,
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
  backText: {
    color: colors.deep,
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 28,
  },
  title: {
    color: colors.deep,
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  phone: {
    color: colors.terra,
    fontFamily: 'Inter_500Medium',
  },
  resendRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendText: {
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
  },
  resendLink: {
    color: colors.terra,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
});


