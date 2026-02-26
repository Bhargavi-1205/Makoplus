import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { mockProfiles } from '../data/mockProfiles';
import { Profile } from '../types';

interface ProfileContextType {
  profiles: Profile[];
  activeProfile: Profile;
  setActiveProfile: (id: string) => void;
  addProfile: (profile: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: PropsWithChildren) {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [activeProfileId, setActiveProfileId] = useState(mockProfiles[0].id);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0];

  const setActiveProfile = (id: string) => {
    setActiveProfileId(id);
  };

  const addProfile = (profile: Profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  const value = useMemo(
    () => ({ profiles, activeProfile, setActiveProfile, addProfile }),
    [profiles, activeProfile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return ctx;
}

