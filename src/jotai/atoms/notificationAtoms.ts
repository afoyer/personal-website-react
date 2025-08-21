import { atom } from 'jotai';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
  createdAt: number;
}

// Notification state atoms
export const notificationsAtom = atom<Notification[]>([]);
export const maxNotificationsAtom = atom(5);

// Action atoms
export const addNotificationAtom = atom(
  null,
  (get, set, notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    const currentNotifications = get(notificationsAtom);
    const maxNotifications = get(maxNotificationsAtom);

    // Add to beginning of array
    const updatedNotifications = [newNotification, ...currentNotifications];

    // Keep only maxNotifications
    const limitedNotifications = updatedNotifications.slice(
      0,
      maxNotifications
    );

    set(notificationsAtom, limitedNotifications);
  }
);

export const removeNotificationAtom = atom(null, (get, set, id: string) => {
  const currentNotifications = get(notificationsAtom);
  const filteredNotifications = currentNotifications.filter(
    notification => notification.id !== id
  );
  set(notificationsAtom, filteredNotifications);
});

export const clearAllNotificationsAtom = atom(null, (get, set) => {
  set(notificationsAtom, []);
});

export const setMaxNotificationsAtom = atom(null, (get, set, max: number) => {
  set(maxNotificationsAtom, max);
});
