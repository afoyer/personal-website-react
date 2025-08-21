import { atom } from 'jotai';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// User state atoms
export const currentUserAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom(get => get(currentUserAtom) !== null);
export const userLoadingAtom = atom(false);
export const userErrorAtom = atom<string | null>(null);

// Action atoms
export const setUserAtom = atom(null, (get, set, user: User) => {
  set(currentUserAtom, user);
  set(userErrorAtom, null);
});

export const clearUserAtom = atom(null, (get, set) => {
  set(currentUserAtom, null);
  set(userErrorAtom, null);
});

export const updateUserProfileAtom = atom(
  null,
  (get, set, updates: Partial<User>) => {
    const currentUser = get(currentUserAtom);
    if (currentUser) {
      set(currentUserAtom, { ...currentUser, ...updates });
    }
  }
);

export const setUserLoadingAtom = atom(null, (get, set, loading: boolean) => {
  set(userLoadingAtom, loading);
});

export const setUserErrorAtom = atom(null, (get, set, error: string) => {
  set(userErrorAtom, error);
  set(userLoadingAtom, false);
});
