import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";

const SESSION_KEY = "irisAuthUser";
const USERS_KEY = "irisAuthUsers";

interface StoredUser extends User {
  password: string;
}

function readStoredUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function readSessionUser(): User | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* TODO: replace with a real auth API (session/JWT) once the backend auth endpoints exist. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readSessionUser);

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const match = readStoredUsers().find(
      (candidate) => candidate.email === normalizedEmail && candidate.password === password,
    );

    if (!match) {
      throw new Error("Incorrect email or password.");
    }

    const nextUser: User = { name: match.name, email: match.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readStoredUsers();

    if (users.some((candidate) => candidate.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const nextUsers = [...users, { name: name.trim(), email: normalizedEmail, password }];
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));

    const nextUser: User = { name: name.trim(), email: normalizedEmail };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, register, logout }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
