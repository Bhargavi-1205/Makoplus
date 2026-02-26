import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/ui/Button';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const logoY = useRef(new Animated.Value(12)).current;
  const nameY = useRef(new Animated.Value(12)).current;
  const tagY = useRef(new Animated.Value(12)).current;
  const buttonY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const animate = (opacity: Animated.Value, y: Animated.Value, delay: number) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: 350,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);

    Animated.sequence([
      Animated.parallel([
        animate(logoOpacity, logoY, 0),
        animate(nameOpacity, nameY, 150),
        animate(tagOpacity, tagY, 250),
        animate(buttonOpacity, buttonY, 400),
      ]),
      Animated.delay(1000),
    ]).start(() => navigation.replace('Login'));
  }, [buttonOpacity, buttonY, logoOpacity, logoY, nameOpacity, nameY, navigation, tagOpacity, tagY]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: logoOpacity, transform: [{ translateY: logoY }] }}>
        <LinearGradient colors={[colors.blush, colors.terra]} style={styles.logo}>
          <FontAwesome6 name="house-medical" size={32} color={colors.white} />
        </LinearGradient>
      </Animated.View>
      <Animated.Text style={[styles.name, { opacity: nameOpacity, transform: [{ translateY: nameY }] }]}>MakoPlus</Animated.Text>
      <Animated.Text style={[styles.tagline, { opacity: tagOpacity, transform: [{ translateY: tagY }] }]}>
        SKIN & HAIR CLINIC
      </Animated.Text>
      <Animated.View style={[styles.buttonWrap, { opacity: buttonOpacity, transform: [{ translateY: buttonY }] }]}>
        <PrimaryButton label="Get Started" onPress={() => navigation.replace('Login')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deep,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: 16,
    fontSize: 36,
    color: colors.skin,
    letterSpacing: -0.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  tagline: {
    marginTop: 8,
    fontSize: 12,
    color: colors.blush,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'Inter_500Medium',
  },
  buttonWrap: {
    marginTop: 40,
    width: '100%',
  },
});

