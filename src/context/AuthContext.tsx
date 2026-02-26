import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

const SESSION_KEY = 'makoplus_session';

interface AuthContextType {
  isLoggedIn: boolean;
  isBooting: boolean;
  phoneNumber: string;
  loginMode: 'patient' | 'guardian';
  login: (phone: string, mode: 'patient' | 'guardian') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loginMode, setLoginMode] = useState<'patient' | 'guardian'>('patient');

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { phone: string; mode: 'patient' | 'guardian' };
          setPhoneNumber(parsed.phone);
          setLoginMode(parsed.mode);
          setIsLoggedIn(true);
        }
      } finally {
        setIsBooting(false);
      }
    })();
  }, []);

  const login = async (phone: string, mode: 'patient' | 'guardian') => {
    setPhoneNumber(phone);
    setLoginMode(mode);
    setIsLoggedIn(true);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ phone, mode }));
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setPhoneNumber('');
    setLoginMode('patient');
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(
    () => ({ isLoggedIn, isBooting, phoneNumber, loginMode, login, logout }),
    [isLoggedIn, isBooting, phoneNumber, loginMode],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

