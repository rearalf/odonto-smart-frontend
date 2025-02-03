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
            borderColor: '#0B1524',
          },
          '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#19A7CE',
          },
          '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error:hover fieldset':
            {
              borderColor: '#a21732',
            },
          '& .MuiInputBase-root.MuiOutlinedInput-root input:-webkit-autofill': {
            boxShadow: '0 0 0 100px hsl(210, 25%, 91%) inset',
            carretColor: '#0B1524',
            textFillColor: '#0B1524',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root': {
            color: '#0B1524',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root.Mui-error': {
            color: '#e22f32',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
            color: '#19A7CE',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused.Mui-error': {
            color: '#a21732',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#e6eaef',
          color: '#0b1524',
          boxShadow: '0 4px 4px 0 #00000040',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: '#e6eaef',
          '& .MuiDrawer-paper': {
            backgroundColor: '#e6eaef',
            borderRight: 'none',
            boxShadow: '4px 0 4px 0 #00000040',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '& .MuiAlert-icon': {
            color: '#FFF',
          },
          '& .MuiAlert-message ': {
            color: '#FFF',
          },
        },
      },
    },
  },
});

export default themeLight;
