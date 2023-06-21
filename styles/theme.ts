import { Roboto } from 'next/font/google';
import { ThemeOptions } from '@mui/material';
import { red, blue, green, grey } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const getThemeObj = (prefersDarkMode: boolean): ThemeOptions => ({
  palette: {
    primary: {
      main: blue.A200,
    },
    secondary: {
      main: green.A400,
    },
    error: {
      main: red.A400,
    },
    mode: prefersDarkMode ? 'dark' : 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
