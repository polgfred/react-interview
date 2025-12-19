'use client';

import { Box, Stack, useTheme } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';

import Cell from './Cell';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

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
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Stack key={String(rowIdx)} direction="row">
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                value={cellValue}
                onChange={(newValue: string) => {
                  const newRow = [
                    ...spreadsheetState[rowIdx].slice(0, columnIdx),
                    newValue,
                    ...spreadsheetState[rowIdx].slice(columnIdx + 1),
                  ];
                  setSpreadsheetState([
                    ...spreadsheetState.slice(0, rowIdx),
                    newRow,
                    ...spreadsheetState.slice(rowIdx + 1),
                  ]);
                }}
              />
            ))}
          </Stack>
        );
      })}
    </Box>
  );
}
