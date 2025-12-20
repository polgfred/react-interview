import { Box, Stack, useTheme } from '@mui/material';
import _ from 'lodash';
import { create } from 'mutative';
import { useCallback, useState } from 'react';

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

  // the 2-d array representing cell data
  const [spreadsheetState, setSpreadsheetState] = useState<any[][]>(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  // the currently selected cell
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  // move this selection up, down, left, or right
  const moveSelection = useCallback(
    (key: string) => {
      if (!selectedCell) {
        return;
      }

      const [rowIdx, columnIdx] = selectedCell;

      switch (key) {
        case 'ArrowUp':
          if (rowIdx > 0) {
            setSelectedCell([rowIdx - 1, columnIdx]);
          }
          break;
        case 'ArrowDown':
          if (rowIdx < NUM_ROWS - 1) {
            setSelectedCell([rowIdx + 1, columnIdx]);
          }
          break;
        case 'ArrowLeft':
          if (columnIdx > 0) {
            setSelectedCell([rowIdx, columnIdx - 1]);
          }
          break;
        case 'ArrowRight':
          if (columnIdx < NUM_COLUMNS - 1) {
            setSelectedCell([rowIdx, columnIdx + 1]);
          }
          break;
      }
    },
    [selectedCell, setSelectedCell],
  );

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
      }}
      onKeyDown={(ev) => {
        moveSelection(ev.key);
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
              {row.map((cellValue, columnIdx) => {
                const isSelected =
                  selectedCell && selectedCell[0] === rowIdx && selectedCell[1] === columnIdx;
                return (
                  <Cell
                    key={columnIdx}
                    value={cellValue}
                    isSelected={isSelected}
                    onChange={(newValue) => {
                      setSpreadsheetState(
                        create(spreadsheetState, (draft) => {
                          draft[rowIdx][columnIdx] = newValue;
                        }),
                      );
                    }}
                    onToggleCell={() => {
                      if (isSelected) {
                        setSelectedCell(null);
                      } else {
                        setSelectedCell([rowIdx, columnIdx]);
                      }
                    }}
                  />
                );
              })}
            </>
          </Stack>
        ))}
      </>
    </Box>
  );
}
