import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Profile } from '../../types';
import { colors } from '../../theme/colors';

interface ProfileSwitcherProps {
  profiles: Profile[];
  activeProfileId: string;
  onSelect: (id: string) => void;
  onAddPress: () => void;
}

export default function ProfileSwitcher({ profiles, activeProfileId, onSelect, onAddPress }: ProfileSwitcherProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {profiles.map((profile) => {
        const active = profile.id === activeProfileId;
        return (
          <TouchableOpacity key={profile.id} style={styles.item} onPress={() => onSelect(profile.id)}>
            <LinearGradient colors={profile.avatarGradient} style={[styles.avatar, active && styles.avatarActive]}>
              <Text style={styles.emoji}>{profile.emoji}</Text>
            </LinearGradient>
            <Text style={[styles.name, active && styles.nameActive]} numberOfLines={1}>
              {profile.name}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.item} onPress={onAddPress}>
        <View style={styles.addAvatar}>
          <Text style={styles.addPlus}>+</Text>
        </View>
        <Text style={styles.name}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 10 },
  item: { minWidth: 64, alignItems: 'center' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  avatarActive: {
    borderColor: colors.terra,
  },
  emoji: {
    fontSize: 20,
  },
  name: {
    marginTop: 6,
    fontSize: 11,
    color: colors.muted,
    fontFamily: 'Inter_500Medium',
  },
  nameActive: {
    color: colors.terra,
    fontFamily: 'Inter_500Medium',
  },
  addAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.skin,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 22,
    color: colors.muted,
  },
});


