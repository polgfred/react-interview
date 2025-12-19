import { Input, Box, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';

interface Props {
  value: any;
  onChange: (newValue: any) => void;
}

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function convertToCurrency(value: number) {
  return currencyFormatter.format(value);
}

export default function Cell({ value, onChange }: Props) {
  const theme = useTheme();

  // this is what we show the user, regardless of the actual cell value
  const [displayValue, setDisplayValue] = useState(value);

  // save the value when the user clicks out of the cell
  const handleSave = useCallback(
    (input: string) => {
      // check whether the input is numeric
      let maybeNumber = Number(input);
      if (input.length > 0 && Number.isFinite(maybeNumber)) {
        // update the display to show the formatted value
        setDisplayValue(convertToCurrency(maybeNumber));
        // update the cell value to the actual number
        onChange(maybeNumber);
      } else {
        // otherwise, just show and save the string value
        setDisplayValue(input);
        onChange(input);
      }
    },
    [value, setDisplayValue, onChange],
  );

  return (
    <Box
      sx={{
        borderRight: `1px solid ${theme.palette.divider}`,
        flex: 1,
      }}
    >
      <Input
        value={displayValue}
        onFocus={() => {
          setDisplayValue(value);
        }}
        onBlur={(ev) => {
          handleSave(ev.target.value);
        }}
        onChange={(ev) => {
          setDisplayValue(ev.target.value);
        }}
        sx={{
          padding: 1,
        }}
      />
    </Box>
  );
}
