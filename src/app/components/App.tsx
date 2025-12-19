import { Box, Typography } from '@mui/material';

import Spreadsheet from './Spreadsheet';

export default function App() {
  return (
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
  );
}
