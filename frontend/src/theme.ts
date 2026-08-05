import { createTheme } from '@mui/material/styles';

// Clean, minimal, light. White canvas, generous spacing, one subtle accent.
export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafaf7',
      paper: '#ffffff',
    },
    primary: {
      // Warm graphite — one calm accent, not a punchy brand color.
      main: '#2f2a26',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1c1b1a',
      secondary: '#6b6560',
    },
    divider: 'rgba(28, 27, 26, 0.08)',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 600, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.005em' },
    body1: { lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { paddingInline: 20, paddingBlock: 10 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid rgba(28, 27, 26, 0.08)',
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff' },
      },
    },
  },
});
