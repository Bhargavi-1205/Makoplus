import { View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

interface RootNavigatorProps {
  onLayout: () => void;
}

export default function RootNavigator({ onLayout }: RootNavigatorProps) {
  const { isLoggedIn, isBooting } = useAuth();

  return <View style={{ flex: 1 }} onLayout={onLayout}>{isBooting ? null : isLoggedIn ? <MainNavigator /> : <AuthNavigator />}</View>;
}

