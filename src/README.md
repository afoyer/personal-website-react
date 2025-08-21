# React App Structure & State Management

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.jsx
├── pages/              # Page components (routes)
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── context/            # React Context for global state
│   └── AppContext.jsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js
├── utils/              # Utility functions
├── styles/             # CSS/SCSS files
└── assets/             # Static assets (images, etc.)
```

## State Management Approaches

### 1. React Context (Global State)

- **Use for**: App-wide state that needs to be shared between pages
- **Examples**: User authentication, theme settings, notifications, global counters
- **Implementation**: `src/context/AppContext.jsx`

```jsx
// In any component
import { useAppContext } from '../context/AppContext';

function MyComponent() {
  const { globalCount, incrementGlobalCount } = useAppContext();

  return <button onClick={incrementGlobalCount}>Count: {globalCount}</button>;
}
```

### 2. Local State (Component State)

- **Use for**: State that only affects a single component
- **Examples**: Form inputs, UI toggles, component-specific counters
- **Implementation**: `useState` hook

```jsx
function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>Local Count: {count}</button>
  );
}
```

### 3. Local Storage (Persistent State)

- **Use for**: State that should persist between page refreshes
- **Examples**: User preferences, form data, cached data
- **Implementation**: `src/hooks/useLocalStorage.js`

```jsx
import useLocalStorage from '../hooks/useLocalStorage';

function MyComponent() {
  const [savedData, setSavedData] = useLocalStorage('myData', '');

  return (
    <input value={savedData} onChange={e => setSavedData(e.target.value)} />
  );
}
```

### 4. URL State (Route Parameters)

- **Use for**: State that should be bookmarkable and shareable
- **Examples**: Current page, filters, search queries
- **Implementation**: React Router's `useParams`, `useSearchParams`

```jsx
import { useSearchParams } from 'react-router-dom';

function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  return (
    <select
      value={filter}
      onChange={e => setSearchParams({ filter: e.target.value })}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
    </select>
  );
}
```

## Best Practices

1. **Start with local state** - Only move to global state when needed
2. **Use Context sparingly** - Too much global state can make the app hard to debug
3. **Persist important data** - Use localStorage for user preferences
4. **Keep URLs meaningful** - Use route parameters for shareable state
5. **Separate concerns** - Keep components focused on single responsibilities

## Adding New Pages

1. Create a new file in `src/pages/`
2. Export the component as default
3. Add the route in `src/App.jsx`
4. Add navigation link in `src/components/Navigation.jsx`

## Adding New Components

1. Create a new file in `src/components/`
2. Export the component as default
3. Import and use in pages as needed
