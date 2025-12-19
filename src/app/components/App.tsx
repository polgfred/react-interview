import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';

import theme from '../../theme';
import Spreadsheet from './Spreadsheet';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            marginBottom: 4,
          }}
        >
          Spreadsheet
        </Typography>
        <Spreadsheet />
      </Box>
    </ThemeProvider>
  );
}
