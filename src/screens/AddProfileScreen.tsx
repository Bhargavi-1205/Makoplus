import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactNode, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/ui/Button';
import ScreenHeader from '../components/ui/ScreenHeader';
import { useProfile } from '../context/ProfileContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { Profile } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddProfile'>;

const RELATIONS: Profile['relation'][] = ['self', 'child', 'parent', 'spouse', 'other'];
const GENDERS: Profile['gender'][] = ['female', 'male', 'other'];

export default function AddProfileScreen({ navigation }: Props) {
  const { addProfile, setActiveProfile } = useProfile();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState<Profile['relation']>('other');
  const [gender, setGender] = useState<Profile['gender']>('female');
  const [bloodGroup, setBloodGroup] = useState('');

  const isValid = useMemo(() => {
    const ageNumber = Number(age);
    return name.trim().length > 1 && Number.isFinite(ageNumber) && ageNumber > 0 && ageNumber < 120;
  }, [name, age]);

  const handleSave = () => {
    if (!isValid) {
      Alert.alert('Invalid profile', 'Please enter a valid name and age.');
      return;
    }

    const nextId = `p${Date.now()}`;
    const trimmedName = name.trim();
    const profile: Profile = {
      id: nextId,
      name: trimmedName,
      age: Number(age),
      relation,
      gender,
      bloodGroup: bloodGroup.trim() || undefined,
      isGuardianDependent: relation === 'child',
      emoji: gender === 'male' ? '👨' : gender === 'female' ? '👩' : '🧑',
      avatarGradient: gender === 'male' ? ['#BFDBFE', '#3B82F6'] : gender === 'female' ? ['#93C5FD', '#2563EB'] : ['#60A5FA', '#1D4ED8'],
    };

    addProfile(profile);
    setActiveProfile(nextId);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScreenHeader title="Add Profile" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Field label="Name">
          <TextInput value={name} onChangeText={setName} placeholder="Enter name" placeholderTextColor={colors.muted} style={styles.input} />
        </Field>

        <Field label="Age">
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
            placeholderTextColor={colors.muted}
            keyboardType="number-pad"
            style={styles.input}
          />
        </Field>

        <Field label="Relation">
          <ChipRow values={RELATIONS} selected={relation} onSelect={(value) => setRelation(value)} />
        </Field>

        <Field label="Gender">
          <ChipRow values={GENDERS} selected={gender} onSelect={(value) => setGender(value)} />
        </Field>

        <Field label="Blood Group (optional)">
          <TextInput
            value={bloodGroup}
            onChangeText={setBloodGroup}
            placeholder="Example: B+"
            placeholderTextColor={colors.muted}
            autoCapitalize="characters"
            style={styles.input}
          />
        </Field>

        <PrimaryButton label="Save Profile" onPress={handleSave} disabled={!isValid} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function ChipRow<T extends string>({ values, selected, onSelect }: { values: T[]; selected: T; onSelect: (value: T) => void }) {
  return (
    <View style={styles.chipRow}>
      {values.map((value) => {
        const active = value === selected;
        return (
          <Pressable key={value} onPress={() => onSelect(value)}>
            <Text style={[styles.chip, active && styles.chipActive]}>{value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  content: {
    padding: 20,
    gap: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.muted,
    fontFamily: 'Inter_500Medium',
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.skin,
    color: colors.deep,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.muted,
    backgroundColor: colors.skin,
    fontFamily: 'Inter_500Medium',
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  chipActive: {
    color: colors.white,
    backgroundColor: colors.terra,
    borderColor: colors.terra,
  },
});
