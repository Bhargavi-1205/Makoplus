import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Book: 'calendar-outline',
  Prescriptions: 'medical-outline',
  Profile: 'person-outline',
};

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { height: 72 + insets.bottom, paddingBottom: insets.bottom }]}>
      {Platform.OS === 'ios' ? <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} /> : null}
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;
          const icon = ICONS[route.name] ?? 'ellipse-outline';

          const onPress = () => {
            if (route.name === 'Book') {
              navigation.getParent()?.navigate('Booking' as never);
              return;
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <Pressable key={route.key} style={styles.item} onPress={onPress}>
              <Ionicons name={icon} size={22} color={isFocused ? colors.terra : colors.muted} />
              <Text style={[styles.label, { color: isFocused ? colors.terra : colors.muted }]}>{label}</Text>
              {isFocused ? <View style={styles.dot} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,250,245,0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    flex: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 2,
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.terra,
    marginTop: 4,
  },
});
