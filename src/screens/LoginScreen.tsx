import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/ui/Button';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);

  const goOtp = (mode: 'patient' | 'guardian') => {
    navigation.navigate('OTP', { phoneNumber: phone || '9876543210', mode });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Welcome back 👋</Text>
        <Text style={styles.headerSub}>Enter your mobile number to continue</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryBox}>
              <Text style={styles.countryText}>+91</Text>
            </View>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="98765 43210"
              placeholderTextColor={colors.muted}
              keyboardType="phone-pad"
              style={[styles.phoneInput, focused && styles.focusedInput]}
            />
          </View>

          <PrimaryButton label="Send OTP" onPress={() => goOtp('patient')} />

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>OR SIGN IN AS</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.accountRow}>
            <Pressable style={styles.patientBtn} onPress={() => goOtp('patient')}>
              <View style={styles.roleInner}>
                <Ionicons name="person-outline" size={16} color={colors.deep} />
                <Text style={styles.patientText}>Patient</Text>
              </View>
            </Pressable>
            <Pressable style={styles.guardianBtn} onPress={() => goOtp('guardian')}>
              <View style={styles.roleInner}>
                <Ionicons name="people-outline" size={16} color={colors.terra} />
                <Text style={styles.guardianText}>Guardian</Text>
              </View>
            </Pressable>
          </View>

          <Text style={styles.privacy}>
            By continuing, you agree to MakoPlus privacy policy and terms of service.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  header: {
    backgroundColor: colors.deep,
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  headerTitle: {
    fontSize: 28,
    color: colors.skin,
    fontFamily: 'Inter_700Bold',
  },
  headerSub: {
    marginTop: 8,
    color: colors.blush,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  body: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.muted,
    marginBottom: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  countryBox: {
    width: 72,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.skin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: colors.deep,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.skin,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
  },
  focusedInput: {
    borderColor: colors.terra,
  },
  dividerRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '30%',
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 0.5,
    fontFamily: 'Inter_500Medium',
  },
  accountRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
  },
  patientBtn: {
    flex: 1,
    backgroundColor: colors.mintLight,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  patientText: {
    color: colors.deep,
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
  },
  roleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guardianBtn: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.terra,
    backgroundColor: colors.skin,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  guardianText: {
    color: colors.terra,
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
  },
  privacy: {
    marginTop: 20,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});

