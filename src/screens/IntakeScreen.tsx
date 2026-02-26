import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import ScreenHeader from '../components/ui/ScreenHeader';
import StepIndicator from '../components/ui/StepIndicator';
import IntakeSection from '../components/intake/IntakeSection';
import SelectField from '../components/ui/SelectField';
import TextField from '../components/ui/TextField';
import ToggleRow from '../components/intake/ToggleRow';
import PhotoUploader from '../components/intake/PhotoUploader';
import { PrimaryButton } from '../components/ui/Button';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { IntakeFormData } from '../types';
import { useProfile } from '../context/ProfileContext';
import { mockDoctors } from '../data/mockDoctors';

type Props = NativeStackScreenProps<RootStackParamList, 'Intake'>;

const concernOptions = [
  'Acne / Pimples',
  'Hair Fall / Thinning',
  'Pigmentation / Dark Spots',
  'Rashes / Eczema',
  'Psoriasis',
  'Dandruff / Scalp Issues',
  'Warts / Moles',
  'Other',
];

export default function IntakeScreen({ route, navigation }: Props) {
  const { profileId, visitType, doctorId, date, time } = route.params;
  const { profiles } = useProfile();
  const profile = profiles.find((p) => p.id === profileId) ?? profiles[0];

  const [chiefConcern, setChiefConcern] = useState(concernOptions[0]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('6 months – 1 year');
  const [severity, setSeverity] = useState('Moderate – Noticeable, bothers me');
  const [progressSinceLastVisit, setProgressSinceLastVisit] = useState('Same');
  const [usingTopicalCreams, setUsingTopicalCreams] = useState(true);
  const [itchingOrBurning, setItchingOrBurning] = useState(false);
  const [worsensInSunlight, setWorsensInSunlight] = useState(true);
  const [familyHistorySkin, setFamilyHistorySkin] = useState(false);
  const [pregnantOrBreastfeeding, setPregnantOrBreastfeeding] = useState(false);
  const [currentMedications, setCurrentMedications] = useState('');
  const [knownAllergies, setKnownAllergies] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const title = visitType === 'followup' ? 'Progress Update' : 'Main Concern';
  const sectionIcon = visitType === 'followup' ? 'repeat' : 'target-variant';

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScreenHeader title="Pre-Visit Info" onBack={() => navigation.goBack()} />
      <View style={styles.banner}>
        <View style={styles.bannerRow}>
          <MaterialCommunityIcons name="stethoscope" size={16} color={colors.deep} />
          <Text style={styles.bannerText}>This information helps Dr. Mehta prepare for your visit and saves consultation time.</Text>
        </View>
      </View>
      <StepIndicator total={3} current={2} />
      <ScrollView contentContainerStyle={styles.content}>
        <IntakeSection iconName={sectionIcon} title={title}>
          {visitType === 'followup' ? (
            <SelectField
              label="Progress since last visit"
              value={progressSinceLastVisit}
              onSelect={setProgressSinceLastVisit}
              options={['Much Better', 'Slightly Better', 'Same', 'Slightly Worse', 'Much Worse']}
            />
          ) : null}
          <SelectField label="Primary Skin/Hair Issue" value={chiefConcern} onSelect={setChiefConcern} options={concernOptions} />
          <TextField
            label="Describe in detail"
            value={description}
            onChangeText={setDescription}
            multiline
            minHeight={80}
            placeholder={
              visitType === 'followup'
                ? 'How has your condition changed since your last visit? Better, worse, or same?'
                : 'Where on the body? How long? What triggers it? Any recent changes?'
            }
          />
        </IntakeSection>

        <IntakeSection iconName="chart-box-outline" title="Condition Details">
          <SelectField
            label="How long have you had this?"
            value={duration}
            onSelect={setDuration}
            options={['Less than 1 week', '1–4 weeks', '1–6 months', '6 months – 1 year', 'More than 1 year']}
          />
          <SelectField
            label="Severity (self-assessed)"
            value={severity}
            onSelect={setSeverity}
            options={[
              'Mild – Barely noticeable',
              'Moderate – Noticeable, bothers me',
              'Severe – Affects daily life',
            ]}
          />
        </IntakeSection>

        <IntakeSection iconName="microscope" title="Dermatology Specifics">
          <ToggleRow
            label="Using any topical creams?"
            sublabel="Steroid, moisturizer, sunscreen"
            value={usingTopicalCreams}
            onChange={setUsingTopicalCreams}
          />
          <ToggleRow label="Itching or burning sensation?" value={itchingOrBurning} onChange={setItchingOrBurning} />
          <ToggleRow label="Condition worsens in sunlight?" value={worsensInSunlight} onChange={setWorsensInSunlight} />
          <ToggleRow
            label="Family history of skin issues?"
            sublabel="Eczema, psoriasis, etc."
            value={familyHistorySkin}
            onChange={setFamilyHistorySkin}
          />
          {profile.gender !== 'male' ? (
            <ToggleRow
              label="Currently pregnant or breastfeeding?"
              value={pregnantOrBreastfeeding}
              onChange={setPregnantOrBreastfeeding}
              last
            />
          ) : null}
        </IntakeSection>

        <IntakeSection iconName="pill" title="Medications & Allergies">
          <TextField
            label="Current medications (if any)"
            value={currentMedications}
            onChangeText={setCurrentMedications}
            multiline
            minHeight={60}
            placeholder="Name, dose, since when…"
          />
          <TextField
            label="Known Allergies"
            value={knownAllergies}
            onChangeText={setKnownAllergies}
            placeholder="e.g. Penicillin, Sulfa drugs, Latex…"
          />
        </IntakeSection>

        <IntakeSection iconName="camera-outline" title="Photos (Optional but helpful)">
          <PhotoUploader photos={photos} onChange={setPhotos} />
        </IntakeSection>

        <PrimaryButton
          label="Confirm Appointment →"
          onPress={() => {
            const intakeData: IntakeFormData = {
              profileId,
              visitType,
              chiefConcern,
              description,
              duration,
              severity,
              usingTopicalCreams,
              itchingOrBurning,
              worsensInSunlight,
              familyHistorySkin,
              pregnantOrBreastfeeding: profile.gender === 'male' ? false : pregnantOrBreastfeeding,
              currentMedications,
              knownAllergies,
              photos,
              progressSinceLastVisit: visitType === 'followup' ? progressSinceLastVisit : undefined,
            };

            navigation.navigate('Confirm', {
              intakeData,
              appointmentDetails: {
                profileId,
                doctor: mockDoctors.find((doc) => doc.id === doctorId) ?? mockDoctors[0],
                date,
                time,
                visitType,
                chiefConcern,
                status: 'upcoming',
              },
            });
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  banner: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: colors.mintLight,
    borderWidth: 1,
    borderColor: colors.mint,
    borderRadius: 10,
    padding: 12,
  },
  bannerText: {
    fontSize: 13,
    color: colors.deep,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});

