import { useAtom, useAtomValue } from "jotai";
import type { Atom } from "jotai";

// Import atoms for the hooks
import {
  themeAtom,
  globalCountAtom,
  currentUserAtom,
  isAuthenticatedAtom,
  userLoadingAtom,
  userErrorAtom,
  notificationsAtom,
  maxNotificationsAtom,
  toggleThemeAtom,
  incrementGlobalCountAtom,
  decrementGlobalCountAtom,
  resetGlobalCountAtom,
  toggleSidebarAtom,
  setUserAtom,
  clearUserAtom,
  updateUserProfileAtom,
  addNotificationAtom,
  removeNotificationAtom,
  clearAllNotificationsAtom,
} from "./atoms";

// Custom hook for write-only atoms (actions)
export function useSetAtom<T>(atom: Atom<T>) {
  const [, setAtom] = useAtom(atom);
  return setAtom;
}

// Performance-optimized hooks for specific use cases
export function useTheme() {
  const theme = useAtomValue(themeAtom);
  const [, toggleTheme] = useAtom(toggleThemeAtom);
  return { theme, toggleTheme };
}

export function useCounter() {
  const count = useAtomValue(globalCountAtom);
  const [, increment] = useAtom(incrementGlobalCountAtom);
  const [, decrement] = useAtom(decrementGlobalCountAtom);
  const [, reset] = useAtom(resetGlobalCountAtom);
  return { count, increment, decrement, reset };
}

export function useUser() {
  const currentUser = useAtomValue(currentUserAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const userLoading = useAtomValue(userLoadingAtom);
  const userError = useAtomValue(userErrorAtom);
  const [, setUser] = useAtom(setUserAtom);
  const [, clearUser] = useAtom(clearUserAtom);
  return {
    currentUser,
    isAuthenticated,
    userLoading,
    userError,
    setUser,
    clearUser,
  };
}

export function useNotifications() {
  const notifications = useAtomValue(notificationsAtom);
  const maxNotifications = useAtomValue(maxNotificationsAtom);
  const [, addNotification] = useAtom(addNotificationAtom);
  const [, removeNotification] = useAtom(removeNotificationAtom);
  const [, clearAll] = useAtom(clearAllNotificationsAtom);
  return {
    notifications,
    maxNotifications,
    addNotification,
    removeNotification,
    clearAll,
  };
}
