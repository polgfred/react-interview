import { Box, Stack, SxProps, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { create } from 'mutative';
import { useState } from 'react';

import HeaderCell from './HeaderCell';
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
          <HeaderCell sx={{ flex: '0 0 60px' }}> </HeaderCell>
          {spreadsheetState[0].map((_, columnIdx) => (
            <HeaderCell key={columnIdx} sx={{ flex: 1 }}>
              {columnLabel(columnIdx)}
            </HeaderCell>
          ))}
        </Stack>
        {spreadsheetState.map((row, rowIdx) => (
          <Stack key={rowIdx} direction="row">
            <>
              <HeaderCell sx={{ flex: '0 0 60px' }}>{rowIdx}</HeaderCell>
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
