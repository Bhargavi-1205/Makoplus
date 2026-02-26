import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { MainTabParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

export default function ProfileScreen(_: Props) {
  const insets = useSafeAreaInsets();
  const { activeProfile, profiles, setActiveProfile } = useProfile();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your family profiles</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {[
            ['Name', activeProfile.name],
            ['Relation', activeProfile.relation],
            ['Age', String(activeProfile.age)],
            ['Gender', activeProfile.gender],
            ['Blood Group', activeProfile.bloodGroup ?? 'N/A'],
          ].map(([k, v], index, arr) => (
            <View key={k} style={[styles.row, index === arr.length - 1 && styles.lastRow]}>
              <Text style={styles.key}>{k}</Text>
              <Text style={styles.value}>{v}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Switch Profile</Text>
        {profiles.map((profile) => (
          <PrimaryButton
            key={profile.id}
            label={`${profile.emoji} ${profile.name}${profile.id === activeProfile.id ? ' (Active)' : ''}`}
            onPress={() => setActiveProfile(profile.id)}
          />
        ))}

        <View style={{ marginTop: 18 }}>
          <PrimaryButton label="Logout" onPress={logout} />
        </View>
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
  subtitle: {
    marginTop: 6,
    color: colors.blush,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  content: {
    padding: 16,
    paddingBottom: 110,
    gap: 10,
  },
  card: {
    backgroundColor: colors.skin,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  key: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  value: {
    color: colors.deep,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  section: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
    color: colors.deep,
    fontFamily: 'Inter_700Bold',
  },
});


