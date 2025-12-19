import { Input, Box, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  value: any;
  isSelected: boolean;
  onChange: (newValue: any) => void;
  onToggleCell: () => void;
}

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function convertToCurrency(value: number) {
  return currencyFormatter.format(value);
}

function getRealValue(input: string) {
  let maybeNumber = Number(input);
  if (input.length > 0 && Number.isFinite(maybeNumber)) {
    return maybeNumber;
  } else {
    return input;
  }
}

function getDisplayValue(input: string) {
  const realValue = getRealValue(input);
  if (typeof realValue === 'number') {
    return convertToCurrency(realValue);
  } else {
    return input;
  }
}

export default function Cell({ value, isSelected, onChange, onToggleCell }: Props) {
  const theme = useTheme();

  // this is what we show the user, regardless of the actual cell value
  const [displayValue, setDisplayValue] = useState(value);

  // in case this was changed upstream by a selection move
  useEffect(() => {
    setDisplayValue(getDisplayValue(value));
  }, [value]);

  // save the value when the user clicks out of the cell
  const handleSave = useCallback(
    (input: string) => {
      setDisplayValue(getDisplayValue(input));
      onChange(getRealValue(input));
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
        onClick={(ev) => {
          if (ev.altKey) {
            onToggleCell();
          }
        }}
        sx={{
          backgroundColor: isSelected ? '#8884' : 'inherit',
          padding: 1,
        }}
      />
    </Box>
  );
}
