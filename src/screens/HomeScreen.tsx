import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NextAppointmentCard from '../components/home/NextAppointmentCard';
import ProfileSwitcher from '../components/home/ProfileSwitcher';
import QuickActionGrid from '../components/home/QuickActionGrid';
import VisitHistoryList from '../components/home/VisitHistoryList';
import { useAppointments } from '../context/AppointmentsContext';
import { useProfile } from '../context/ProfileContext';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

function initialsFromName(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { activeProfile, profiles, setActiveProfile } = useProfile();
  const { appointments } = useAppointments();
  const rootNavigation = navigation.getParent<NavigationProp<RootStackParamList>>();

  const activeAppointments = appointments.filter((a) => a.profileId === activeProfile.id);
  const upcoming = activeAppointments.find((a) => a.status === 'upcoming');
  const recentVisits = activeAppointments.filter((a) => a.status === 'completed').slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.name}>{activeProfile.name} 🌸</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <LinearGradient colors={activeProfile.avatarGradient} style={styles.avatar}>
              <Text style={styles.avatarText}>{initialsFromName(activeProfile.name)}</Text>
            </LinearGradient>
          </Pressable>
        </View>
        <NextAppointmentCard appointment={upcoming} onBook={() => rootNavigation?.navigate('Booking')} />
      </View>

      <View style={styles.body}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Profiles</Text>
          <Text style={styles.sectionAction}>Manage</Text>
        </View>
        <ProfileSwitcher
          profiles={profiles}
          activeProfileId={activeProfile.id}
          onSelect={setActiveProfile}
          onAddPress={() => rootNavigation?.navigate('AddProfile')}
        />

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>What do you need?</Text>
        </View>
        <QuickActionGrid
          actions={[
            {
              id: 'book',
              icon: <Ionicons name="calendar-clear-outline" size={28} color={colors.deep} />,
              title: 'Book Appointment',
              subtitle: 'Fresh or follow-up',
               variant: 'mint',
              onPress: () => rootNavigation?.navigate('Booking'),
            },
            {
              id: 'rx',
              icon: <Ionicons name="medical-outline" size={28} color={colors.deep} />,
              title: 'Prescriptions',
              subtitle: 'History & current',
              variant: 'mint',
              onPress: () => navigation.navigate('Prescriptions'),
            },
            {
              id: 'tracker',
              icon: <Ionicons name="camera-outline" size={28} color={colors.deep} />,
              title: 'Skin Tracker',
              subtitle: 'Progress photos',
               variant: 'mint',
              onPress: () => rootNavigation?.navigate('SkinTracker'),
            },
            {
              id: 'reminder',
              icon: <Ionicons name="notifications-outline" size={28} color={colors.deep} />,
              title: 'Reminders',
              subtitle: 'Medication alerts',
               variant: 'mint',
              onPress: () => rootNavigation?.navigate('Reminders'),
            },
          ]}
        />

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Recent Visits</Text>
          <Pressable onPress={() => rootNavigation?.navigate('RecentVisits')}>
            <Text style={styles.sectionAction}>View All</Text>
          </Pressable>
        </View>
        <VisitHistoryList
          visits={recentVisits}
          onPressDetails={(visitId) => rootNavigation?.navigate('VisitDetails', { visitId })}
        />
      </View>
    </ScrollView>
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
    paddingBottom: 48,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 13,
    color: colors.blush,
    fontFamily: 'Inter_400Regular',
  },
  name: {
    marginTop: 2,
    color: colors.skin,
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  body: {
    marginTop: -20,
    backgroundColor: colors.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionHead: {
    marginTop: 24,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.deep,
    fontFamily: 'Inter_700Bold',
  },
  sectionAction: {
    color: colors.terra,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
});
