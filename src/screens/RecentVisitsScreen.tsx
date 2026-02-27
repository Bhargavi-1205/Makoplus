import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../components/ui/ScreenHeader';
import VisitHistoryList from '../components/home/VisitHistoryList';
import { useAppointments } from '../context/AppointmentsContext';
import { useProfile } from '../context/ProfileContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'RecentVisits'>;

export default function RecentVisitsScreen({ navigation }: Props) {
  const { activeProfile } = useProfile();
  const { appointments } = useAppointments();

  const recentVisits = appointments.filter((a) => a.profileId === activeProfile.id && a.status === 'completed');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Recent Visits" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{activeProfile.name} · Completed appointments</Text>
        {recentVisits.length > 0 ? (
          <VisitHistoryList
            visits={recentVisits}
            onPressDetails={(visitId) => navigation.navigate('VisitDetails', { visitId })}
          />
        ) : (
          <Text style={styles.empty}>No completed visits yet for this profile.</Text>
        )}
      </ScrollView>
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
  },
  subtitle: {
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
    marginBottom: 14,
  },
  empty: {
    color: colors.muted,
    fontFamily: 'Inter_400Regular',
    marginTop: 6,
  },
});
