export const MODULES = {
  DOCTORS: import.meta.env.VITE_ENABLE_DOCTORS === 'true',
  PATIENTS: import.meta.env.VITE_ENABLE_PATIENTS === 'true',
  ODONTOGRAM: import.meta.env.VITE_ENABLE_ODONTOGRAM === 'true',
  APPOINTMENTS: true,
};
