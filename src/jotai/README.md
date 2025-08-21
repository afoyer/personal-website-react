# Jotai State Management

This folder contains all Jotai-related state management for the application.

## Structure

```
src/jotai/
├── atoms/              # Individual atom files
│   ├── appAtoms.ts     # App state (theme, count, loading, sidebar)
│   ├── userAtoms.ts    # User state (auth, profile)
│   └── notificationAtoms.ts # Notification state
├── hooks.ts            # Custom hooks for easier usage
├── index.ts            # Main exports
└── README.md           # This file
```

## Usage

### Basic Atom Usage

```tsx
import { useAtom } from 'jotai';
import { themeAtom, toggleThemeAtom } from '../jotai';

function MyComponent() {
  const [theme] = useAtom(themeAtom);
  const [, toggleTheme] = useAtom(toggleThemeAtom);

  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}
```

### Using Custom Hooks

```tsx
import { useAppState } from '../jotai/hooks';

function MyComponent() {
  const { theme, globalCount, isLoading } = useAppState();

  return (
    <div>
      <p>Theme: {theme}</p>
      <p>Count: {globalCount}</p>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
```

### Action Atoms

Action atoms are write-only atoms that perform state updates:

```tsx
import { useAtom } from 'jotai';
import { incrementGlobalCountAtom } from '../jotai';

function Counter() {
  const [, increment] = useAtom(incrementGlobalCountAtom);

  return <button onClick={increment}>Increment</button>;
}
```

### Derived Atoms

Derived atoms compute values based on other atoms:

```tsx
// In appAtoms.ts
export const isDarkModeAtom = atom(get => get(themeAtom) === 'dark');

// Usage
const isDarkMode = useAtomValue(isDarkModeAtom);
```

## Available Atoms

### App Atoms

- `themeAtom` - Current theme ('light' | 'dark')
- `globalCountAtom` - Global counter
- `isLoadingAtom` - Loading state
- `sidebarOpenAtom` - Sidebar visibility
- `toggleThemeAtom` - Toggle theme action
- `incrementGlobalCountAtom` - Increment counter action
- `resetGlobalCountAtom` - Reset counter action

### User Atoms

- `currentUserAtom` - Current user data
- `isAuthenticatedAtom` - Authentication status (derived)
- `userLoadingAtom` - User loading state
- `userErrorAtom` - User error state
- `setUserAtom` - Set user action
- `clearUserAtom` - Clear user action

### Notification Atoms

- `notificationsAtom` - Array of notifications
- `maxNotificationsAtom` - Maximum notifications to show
- `addNotificationAtom` - Add notification action
- `removeNotificationAtom` - Remove notification action
- `clearAllNotificationsAtom` - Clear all notifications action

## Best Practices

1. **Use custom hooks** for complex state combinations
2. **Keep atoms granular** - one atom per piece of state
3. **Use action atoms** for state updates
4. **Use derived atoms** for computed values
5. **Import from `../jotai`** for consistency

## Adding New Atoms

1. Create a new file in `atoms/`
2. Define your atoms with proper TypeScript types
3. Export them from the file
4. Add to `atoms/index.ts` exports
5. Add to main `index.ts` if commonly used
