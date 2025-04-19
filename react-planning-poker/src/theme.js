import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for primary color
      light: '#63a4ff', // Lighter blue
      dark: '#115293', // Darker blue for contrast
    },
    secondary: {
      main: '#ffffff', // White for secondary color
      contrastText: '#1976d2', // Use blue for text on white background
    },
    background: {
      default: '#f3f3f3', // Light grey background
      paper: '#ffffff', // White background for Paper components
      unselected: '#e0e0e0', // Light grey for unselected items
      transparent: 'transparent',
    },
    text: {
      primary: '#333', // Dark text for contrast
      secondary: '#555', // Lighter text for secondary text
    },
    error: {
      main: '#d32f2f', // Red for error color
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1976d2', // Blue text for heading
    },
    h2: {
      fontSize: '2rem',
      color: '#333',
    },
    h3: {
      fontSize: '1.75rem',
      color: '#333',
    },
    button: {
      textTransform: 'none', // Make button text normal case
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for Paper
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#35942e', // Green background for Snackbar
          color: '#ffffff', // White text color
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#35942e', // Green background for Snackbar content
          color: '#ffffff', // White text color
          borderRadius: '8px',
          width: 'auto', // Auto width
          justifyContent: 'center', // Center content
        },
        message: {
          margin: 0,
          fontSize: '1rem', // Font size for Snackbar message
          textAlign: 'center', // Center text
        },
      },
    },
  },
});

export default theme;
