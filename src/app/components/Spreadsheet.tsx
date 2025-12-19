import { Box, Stack, useTheme } from '@mui/material';
import _ from 'lodash';
import { create } from 'mutative';
import { useMemo, useState } from 'react';

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
      {spreadsheetState.map((row, rowIdx) => (
        <Stack key={rowIdx} direction="row">
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
        </Stack>
      ))}
    </Box>
  );
}
