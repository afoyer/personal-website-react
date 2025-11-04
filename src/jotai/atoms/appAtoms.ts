import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// App state atoms with persistence
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');
export const globalCountAtom = atom(0);
export const isLoadingAtom = atom(false);
export const sidebarOpenAtom = atom(false);

// Derived atoms
export const isDarkModeAtom = atom(get => get(themeAtom) === 'dark');

// Action atoms
export const toggleThemeAtom = atom(null, (get, set) => {
  const currentTheme = get(themeAtom);
  set(themeAtom, currentTheme === 'light' ? 'dark' : 'light');
});

export const incrementGlobalCountAtom = atom(null, (get, set) => {
  const currentCount = get(globalCountAtom);
  set(globalCountAtom, currentCount + 1);
});

export const decrementGlobalCountAtom = atom(null, (get, set) => {
  const currentCount = get(globalCountAtom);
  set(globalCountAtom, currentCount - 1);
});

export const resetGlobalCountAtom = atom(null, (_get, set) => {
  set(globalCountAtom, 0);
});

export const toggleSidebarAtom = atom(null, (get, set) => {
  const currentState = get(sidebarOpenAtom);
  set(sidebarOpenAtom, !currentState);
});
