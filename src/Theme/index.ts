import { createTheme } from '@mui/material';

const themeLight = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      '100': '#D0FCF9',
      '200': '#A2FAF9',
      '300': '#71E7F0',
      '400': '#4CCCE1',
      '500': '#19A7CE',
      '600': '#1283B1',
      '700': '#0C6394',
      '800': '#074677',
      '900': '#043362',
    },
    info: {
      '100': '#CEEAFF',
      '200': '#9DD2FF',
      '300': '#6DB6FF',
      '400': '#489CFF',
      '500': '#0C71FF',
      '600': '#0857DB',
      '700': '#0640B7',
      '800': '#032D93',
      '900': '#021F7A',
    },
    error: {
      '100': '#fde2d5',
      '200': '#fcbfac',
      '300': '#f69381',
      '400': '#ed6a60',
      '500': '#e22f32',
      '600': '#c22233',
      '700': '#a21732',
      '800': '#830e2f',
      '900': '#6c092d',
    },
    success: {
      '100': '#effbce',
      '200': '#dbf7a0',
      '300': '#bbe76d',
      '400': '#97cf46',
      '500': '#6aaf15',
      '600': '#53960f',
      '700': '#3f7d0a',
      '800': '#2e6506',
      '900': '#215304',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#333',
          },
          '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#19A7CE',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root': {
            color: '#333',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
            color: '#19A7CE',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white',
        },
      },
    },
  },
});

export default themeLight;
