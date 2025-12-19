import { Box, Stack, SxProps, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { create } from 'mutative';
import { ReactNode, useState } from 'react';

import Cell from './Cell';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const COLUMNS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function columnLabel(columnIdx: number) {
  if (columnIdx < COLUMNS.length) {
    return COLUMNS[columnIdx];
  }
  const major = Math.floor(columnIdx / COLUMNS.length);
  const minor = columnIdx % COLUMNS.length;
  return columnLabel(major - 1) + COLUMNS[minor];
}

function Header({ sx, children }: { sx?: SxProps; children?: ReactNode }) {
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

export default function Spreadsheet() {
  const theme = useTheme();

  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
      }}
    >
      <>
        <Stack direction="row">
          <Header sx={{ flex: '0 0 60px' }}> </Header>
          {spreadsheetState[0].map((_, columnIdx) => (
            <Header key={columnIdx} sx={{ flex: 1 }}>
              {columnLabel(columnIdx)}
            </Header>
          ))}
        </Stack>
        {spreadsheetState.map((row, rowIdx) => (
          <Stack key={rowIdx} direction="row">
            <>
              <Header sx={{ flex: '0 0 60px' }}>{rowIdx}</Header>
              {row.map((cellValue, columnIdx) => (
                <Cell
                  key={columnIdx}
                  value={cellValue}
                  onChange={(newValue) => {
                    setSpreadsheetState(
                      create(spreadsheetState, (draft) => {
                        draft[rowIdx][columnIdx] = newValue;
                      }),
                    );
                  }}
                />
              ))}
            </>
          </Stack>
        ))}
      </>
    </Box>
  );
}
