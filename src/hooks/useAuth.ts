'use client';

import { useCallback, useEffect, useState } from 'react';
import { demoAuthProvider } from '@/lib/auth';
import { DemoUser, UserRole } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(demoAuthProvider.getCurrentUser());
    setHydrated(true);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const u = await demoAuthProvider.signIn(email, password);
    setUser(u);
    return u;
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string, role: UserRole) => {
      const u = await demoAuthProvider.signUp(name, email, password, role);
      setUser(u);
      return u;
    },
    []
  );

  const signOut = useCallback(async () => {
    await demoAuthProvider.signOut();
    setUser(null);
  }, []);

  return { user, hydrated, signIn, signUp, signOut };
}