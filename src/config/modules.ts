export const MODULES = {
  doctors: import.meta.env.VITE_ENABLE_DOCTORS === 'true',
  patient: import.meta.env.VITE_ENABLE_PATIENTS === 'true',
  appointments: true,
};
