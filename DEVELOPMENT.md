# Development Guide

This guide will help you understand how to work with and extend this React boilerplate.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx  # Main navigation component
│   ├── CustomSignIn.tsx # Authentication component
│   ├── AppDemo.tsx     # Demo component showing Jotai features
│   └── ExampleComponent.tsx # Example component template
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   ├── About.tsx       # About page
│   └── Profile.tsx     # User profile page
├── hooks/              # Custom React hooks
├── jotai/              # State management
│   ├── atoms/          # Jotai atoms
│   └── hooks.ts        # Custom hooks for atoms
├── styles/             # Global styles (currently empty)
└── utils/              # Utility functions (currently empty)
```

## Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

Example:

```tsx
// src/pages/NewPage.tsx
import React from "react";

const NewPage: React.FC = () => {
  return (
    <div className="new-page">
      <h1>New Page</h1>
      <p>Your content here</p>
    </div>
  );
};

export default NewPage;
```

## Adding New Components

1. Create a new component in `src/components/`
2. Import and use it in your pages
3. Add styles to `src/App.css` if needed

## State Management with Jotai

The project uses Jotai for lightweight state management. See `src/jotai/atoms/` for examples:

- `appAtoms.ts` - App-wide state (theme, counter, sidebar)
- `userAtoms.ts` - User-related state
- `notificationAtoms.ts` - Notification system

## Styling

The project uses CSS with a modern design system. You can:

- Add your own CSS framework (Tailwind, CSS Modules, etc.)
- Extend the existing CSS in `src/App.css`
- Create component-specific CSS files

## AWS Amplify

The project includes AWS Amplify for authentication. To configure:

1. Set up your AWS account
2. Run `cd amplify && npm install`
3. Run `npx amplify init`
4. Configure your authentication settings

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Customization Tips

1. **Theme**: Modify the color scheme in `src/App.css`
2. **Layout**: Update the navigation and main content structure
3. **Components**: Use the ExampleComponent as a template
4. **State**: Add new atoms in the jotai directory
5. **Routing**: Add new routes in App.tsx

## Best Practices

1. Use TypeScript for all new components
2. Follow the existing component structure
3. Keep components small and focused
4. Use the existing CSS classes when possible
5. Test your changes with `npm run lint`

## Need Help?

- Check the existing components for examples
- Review the Jotai documentation for state management
- Look at the AWS Amplify docs for authentication features
- Use the AppDemo component to see Jotai features in action
