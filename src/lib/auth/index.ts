import { DemoUser, UserRole } from '@/types';

const DEMO_ACCOUNTS: Record<string, { password: string; user: DemoUser }> = {
  'student@learnhub.demo': {
    password: 'demo1234',
    user: { id: 'demo-student', name: 'Alex Johnson', email: 'student@learnhub.demo',
            role: 'student', avatar: 'https://i.pravatar.cc/150?img=3' },
  },
  'instructor@learnhub.demo': {
    password: 'demo1234',
    user: { id: 'demo-instructor', name: 'Sarah Wilson', email: 'instructor@learnhub.demo',
            role: 'instructor', avatar: 'https://i.pravatar.cc/150?img=5' },
  },
  'admin@learnhub.demo': {
    password: 'demo1234',
    user: { id: 'demo-admin', name: 'Tom Brown', email: 'admin@learnhub.demo',
            role: 'admin', avatar: 'https://i.pravatar.cc/150?img=52' },
  },
};

export const DEMO_CREDENTIALS = Object.entries(DEMO_ACCOUNTS).map(([email, { user }]) => ({
  email, password: 'demo1234', role: user.role, name: user.name,
}));

export interface AuthProvider {
  signIn(email: string, password: string): Promise<DemoUser>;
  signUp(name: string, email: string, password: string, role: UserRole): Promise<DemoUser>;
  signOut(): Promise<void>;
  getCurrentUser(): DemoUser | null;
}

const STORAGE_KEY = 'learnhub:auth-user';

export const demoAuthProvider: AuthProvider = {
  async signIn(email, password) {
    await new Promise((r) => setTimeout(r, 600));
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (!account || account.password !== password) {
      throw new Error('Invalid email or password. Try a demo account.');
    }
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(account.user));
    return account.user;
  },
  async signUp(name, email, password, role) {
    await new Promise((r) => setTimeout(r, 600));
    if (password.length < 8) throw new Error('Password must be at least 8 characters.');
    const user: DemoUser = { id: `demo-${Date.now()}`, name, email, role,
                             avatar: 'https://i.pravatar.cc/150?img=68' };
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },
  async signOut() {
    await new Promise((r) => setTimeout(r, 200));
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  },
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as DemoUser; } catch { return null; }
  },
};