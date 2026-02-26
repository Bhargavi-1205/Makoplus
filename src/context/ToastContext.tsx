import { createContext, PropsWithChildren, useContext, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const translateY = useRef(new Animated.Value(90)).current;
  const insets = useSafeAreaInsets();

  const showToast = (nextMessage: string) => {
    setMessage(nextMessage);
    setVisible(true);
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(translateY, {
        toValue: 90,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {visible ? (
        <Animated.View style={[styles.toast, { bottom: insets.bottom + 16, transform: [{ translateY }] }]}> 
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.deep,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toastText: {
    color: colors.skin,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
});

