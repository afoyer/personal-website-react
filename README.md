# React + AWS Amplify Boilerplate

A modern React boilerplate with AWS Amplify authentication, TypeScript, and modern tooling.

## Features

- ⚡ **React 19** with TypeScript
- 🔐 **AWS Amplify Authentication** with custom sign-in
- 🚀 **Vite** for fast development and building
- 🧭 **React Router** for client-side routing
- 🎯 **Jotai** for lightweight state management
- 🎨 **Tailwind CSS** ready (add your own CSS framework)
- 📱 **Responsive design** with modern UI components
- 🔧 **ESLint + Prettier** for code quality
- 📦 **Modern package management** with npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS Account (for Amplify services)

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd react-amplify-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Configure AWS Amplify:
```bash
cd amplify
npm install
npx amplify init
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── jotai/              # State management atoms
├── styles/             # Global styles
└── utils/              # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

### Styling

The project is set up to work with any CSS framework. Add your preferred styling solution:

- **Tailwind CSS**: `npm install -D tailwindcss`
- **CSS Modules**: Create `.module.css` files
- **Styled Components**: `npm install styled-components`

### State Management

The project uses Jotai for state management. Add new atoms in `src/jotai/atoms/`.

## Deployment

This boilerplate is ready for deployment on:

- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3 + CloudFront**: Use the built files
- **GitHub Pages**: Configure for GitHub Actions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this boilerplate for your projects!
