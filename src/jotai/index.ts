// Export all atoms
export * from './atoms';

// Export custom hooks
export * from './hooks';

// Re-export commonly used atoms for convenience
export {
  themeAtom,
  globalCountAtom,
  isLoadingAtom,
  sidebarOpenAtom,
  toggleThemeAtom,
  incrementGlobalCountAtom,
  resetGlobalCountAtom,
  toggleSidebarAtom,
} from './atoms/appAtoms';

export {
  currentUserAtom,
  isAuthenticatedAtom,
  userLoadingAtom,
  userErrorAtom,
  setUserAtom,
  clearUserAtom,
  updateUserProfileAtom,
} from './atoms/userAtoms';

export {
  notificationsAtom,
  maxNotificationsAtom,
  addNotificationAtom,
  removeNotificationAtom,
  clearAllNotificationsAtom,
} from './atoms/notificationAtoms';
