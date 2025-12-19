import { Input, Box, useTheme } from '@mui/material';
import { type ChangeEventHandler, useCallback } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export default function Cell({ value, onChange }: Props) {
  const theme = useTheme();

  const onChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      onChange(ev.target.value);
    },
    [onChange],
  );

  return (
    <Box
      sx={{
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Input
        value={value}
        onChange={onChangeHandler}
        sx={{
          padding: 1,
        }}
      />
    </Box>
  );
}
