import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PrescriptionCard from '../components/prescriptions/PrescriptionCard';
import { useProfile } from '../context/ProfileContext';
import { mockPrescriptions } from '../data/mockPrescriptions';
import { MainTabParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = BottomTabScreenProps<MainTabParamList, 'Prescriptions'>;

export default function PrescriptionsScreen(_: Props) {
  const insets = useSafeAreaInsets();
  const { activeProfile } = useProfile();
  const filtered = mockPrescriptions.filter((item) => item.profileId === activeProfile.id);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.titleRow}>
          <Ionicons name="medical" size={22} color={colors.skin} />
          <Text style={styles.title}>Prescriptions</Text>
        </View>
        <Text style={styles.subtitle}>{activeProfile.name} · All visits</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {filtered.map((item) => (
          <PrescriptionCard key={item.id} item={item} />
        ))}
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    color: colors.skin,
    fontFamily: 'Inter_700Bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    marginTop: 6,
    color: colors.blush,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
});

