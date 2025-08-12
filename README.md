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
├── public/
├──src/
    ├── assets/
    │   ├── images/
    │   ├── fonts/
    │   ├── icons/
    │
    ├── api/                     # Configuración global y servicios API reutilizables
    │    ├── axios.ts            # Instancia de Axios configurada (baseURL, interceptors para token)
    │    ├── auth.api.ts         # Endpoints de autenticación (login, refresh token, logout)
    │    └── index.ts            # Barrel file exportando APIs generales
    │
    ├── modules/                 # Módulos funcionales del sistema
    │    ├── auth/               # Módulo de autenticación (login, registro)
    │    │    ├── components/
    │    │    ├── hooks/
    │    │    ├── pages/
    │    │    ├── services/
    │    │    ├── types/
    │    │    ├── store/
    │    │    ├── utils/
    │    │    └── index.ts
    │    │
    │    ├── doctors/            # Módulo especializado para doctores
    │    │    ├── components/
    │    │    │    ├── DoctorForm/
    │    │    │    ├── DoctorList/
    │    │    │    ├── DoctorDetail/
    │    │    │    └── SpecialtySelector/
    │    │    ├── hooks/
    │    │    │    ├── useDoctors.ts
    │    │    │    ├── useSpecialties.ts
    │    │    │    ├── useRoles.ts
    │    │    │    └── usePermissions.ts
    │    │    ├── pages/
    │    │    │    ├── DoctorsListPage/
    │    │    │    ├── DoctorCreatePage/
    │    │    │    └── DoctorEditPage/
    │    │    ├── services/
    │    │    │    ├── doctors.service.ts
    │    │    │    ├── specialties.service.ts
    │    │    │    ├── roles.service.ts
    │    │    │    └── permissions.service.ts
    │    │    ├── store/
    │    │    │    ├── doctors.store.ts
    │    │    │    └── specialties.store.ts
    │    │    ├── types/
    │    │    │    ├── doctor.types.ts
    │    │    │    ├── specialty.types.ts
    │    │    │    ├── role.types.ts
    │    │    │    └── permission.types.ts
    │    │    ├── utils/
    │    │    │    └── doctor.helpers.ts
    │    │    └── index.ts
    │    │
    │    ├── patients/           # Módulo especializado para pacientes
    │    │    ├── components/
    │    │    ├── hooks/
    │    │    ├── pages/
    │    │    ├── services/
    │    │    ├── types/
    │    │    ├── store/
    │    │    ├── utils/
    │    │    └── index.ts
    │    │
    │    ├── users/              # Módulo general para usuarios administrativos (recepcionistas, asistentes, etc.)
    │    │    ├── components/
    │    │    ├── hooks/
    │    │    ├── pages/
    │    │    ├── services/
    │    │    ├── types/
    │    │    ├── store/
    │    │    ├── utils/
    │    │    └── index.ts
    │    │
    │    ├── appointments/       # Módulo para gestión de citas
    │    │    ├── components/
    │    │    ├── hooks/
    │    │    ├── pages/
    │    │    ├── services/
    │    │    ├── types/
    │    │    ├── store/
    │    │    ├── utils/
    │    │    └── index.ts
    │    │
    │    ├── odontograms/        # Módulo para odontogramas
    │    │    ├── components/
    │    │    ├── hooks/
    │    │    ├── pages/
    │    │    ├── services/
    │    │    ├── types/
    │    │    ├── store/
    │    │    ├── utils/
    │    │    └── index.ts
    │    │
    │    └── ...
    │
    ├── layouts/                 # Layouts globales y reutilizables
    │    ├── MainLayout.tsx      # Layout principal (navbar + sidebar + contenido)
    │    ├── AuthLayout.tsx      # Layout para páginas públicas (login, registro)
    │    └── index.ts
    │
    ├── routes/                  # Configuración y componentes de rutas (react-router)
    │    ├── AppRoutes.tsx       # Definición de rutas de la aplicación
│   │    ├── PrivateRoute.tsx    # Componente para rutas protegidas (auth)
│   │    └── PublicRoute.tsx     # Componente para rutas públicas
│   │
│   ├── styles/                  # Estilos globales y variables CSS
│   │    ├── globals.css
│   │    └── variables.css
│   │
│   ├── theme/                   # Tema Material UI personalizado
│   │    ├── theme.ts            # Definición del tema con createTheme()
│   │    └── index.ts
│   │
│   ├── App.tsx                  # Entrada principal de la app React con rutas
│   └── main.tsx                 # Renderizado React en DOM con ThemeProvider y BrowserRouter
│
├── .env
├── tsconfig.json
├── vite.config.ts
└── package.json
```
