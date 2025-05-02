# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

# Project structure

```plaintext
frontend/
├── public/
├── src/
│   ├── api/                   # Configuring Axios and services by module
│   │   ├── axios.ts           # Axios main instance (with interceptors, baseURL, etc.)
│   │   └── user.api.ts        # Example of service for users
│
│   ├── components/            # Reusable components (buttons, inputs, etc.)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── styles.ts
│   │   └── ...
│
│   ├── hooks/                 # Custom hooks (useDebounce, useAuth, etc.)
│
│   ├── pages/                 # App pages (if you use React Router)
│   │   ├── Home/
│   │   ├── Login/
│   │   └── ...
│
│   ├── router/                # Definición de rutas
│   │   └── index.tsx
│
│   ├── store/                 # General overall status (Zustand stores general)
│   │   └── auth.store.ts
│
│   ├── types/                 # Global types (interfaces, enums)
│   │   └── index.ts
│
│   ├── utils/                 # Utility functions, helpers
│   │   └── formatDate.ts
│
│   ├── constants/             # Global constants (route names, messages, etc.)
│   │   └── routes.ts
│
│   ├── theme/                 # Theme settings if you use Material UI or similar
│   │   └── index.ts
│
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── tsconfig.json
├── vite.config.ts
└── package.json
```
