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
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.MuiPickersTextField-root fieldset': {
            borderColor: '#0B1524',
          },
          '&.MuiPickersTextField-root .MuiPickersInputBase-root.MuiPickersOutlinedInput-root:hover fieldset':
            {
              borderColor: '#19A7CE',
            },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#0B1524',
          },
          '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#19A7CE',
          },
          '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-multiline textarea':
            {
              width: '100%',
              height: '100% !important',
              overflowY: 'auto !important',
              minHeight: '6.25rem',
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
        containedInherit: {
          backgroundColor: '#f5f5f5',
          color: '#0B1524',
          '&:hover': {
            backgroundColor: '#e0e0e0',
            borderColor: '#bdbdbd',
          },
          '&:active': {
            backgroundColor: '#d5d5d5',
          },
          '&:disabled': {
            backgroundColor: '#f9f9f9',
            color: '#c0c0c0',
            borderColor: '#f0f0f0',
          },
          '&:focus': {
            outline: '2px solid #19A7CE',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained': {
            boxShadow: 'none',
          },
          '&.MuiButton-contained:hover': {
            boxShadow: 'none',
          },
          '&.MuiButton-containedInherit': {
            boxShadow: 'none',
          },
          '&.MuiButton-containedInherit:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--clr-surface-a0)',
          color: '#0b1524',
          boxShadow: 'none',
          borderBottom: '1px solid var(--clr-surface-a50)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: '#e6eaef',
          '& .MuiDrawer-paper': {
            backgroundColor: 'var(--clr-surface-a0)',
            borderRight: '1px solid var(--clr-surface-a50)',
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
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&.MuiTableContainer-root': {
            boxShadow: 'none',
            border: '1px solid var(--clr-surface-a50)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '&.MuiTableHead-root ': {
            backgroundColor: 'var(--clr-surface-a10)',
            textTransform: 'capitalize',
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-iconContainer .MuiSvgIcon-root .MuiStepIcon-text ': {
            fill: 'var(--clr-surface-a0)',
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h4', component: 'h1' },
          style: {
            fontWeight: 600,
            color: '#19A7CE',
            letterSpacing: '-0.02em',
          },
        },
        {
          props: { variant: 'h5', component: 'h2' },
          style: {
            fontWeight: 500,
            color: '#1283B1',
            letterSpacing: '-0.02em',
          },
        },
        {
          props: { variant: 'h6', component: 'h3' },
          style: {
            fontWeight: 400,
            color: '#0C6394',
            letterSpacing: '-0.02em',
          },
        },
      ],
    },
  },
});

export default themeLight;
