import { SxProps, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';

export default function HeaderCell({ sx, children }: { sx?: SxProps; children?: ReactNode }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRight: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <Typography
        sx={{
          padding: 1,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
