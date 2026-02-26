import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { AppointmentsProvider } from './src/context/AppointmentsContext';
import { ToastProvider } from './src/context/ToastContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Poppins_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProfileProvider>
          <AppointmentsProvider>
            <ToastProvider>
              <NavigationContainer>
                <RootNavigator onLayout={onLayoutRootView} />
              </NavigationContainer>
            </ToastProvider>
          </AppointmentsProvider>
        </ProfileProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
