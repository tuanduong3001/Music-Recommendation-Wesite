import React from 'react';
import { Controller,FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { styled, TextField, TextFieldProps, Theme, Typography, SxProps, Box, TypographyProps } from '@mui/material';

const TextFieldCustom = styled(TextField)<TextFieldProps>({
  '.MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: '#ffffff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #2F3C51',
      borderRadius: '8px',
    },
    '&:hover fieldset': {
      borderColor: '#2F3C51',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6A78FA',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FF6150',
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2F3C51',
    },
  },
});
const ErrorText = styled(Typography)<TypographyProps>({
  marginTop: '10px',
  color: '#FF6150',
});
interface UserInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  requiredIcon?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  inputHeight?: string;
  sx?: SxProps<Theme>;
}

const UserInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  helperText,
  placeholder,
  defaultValue = undefined,
  variant = 'outlined',
  disabled = false,
  ...props
}: UserInput<TFieldValues, TName>) => {
  defaultValue = defaultValue === null ? undefined : defaultValue;
  const {
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue,
  });

  return (
    <Box {...props}  sx={{
      marginTop: '10px',
    }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextFieldCustom
            defaultValue={String(defaultValue)}
            disabled={disabled}
            inputProps={{
              style: {
                backgroundColor: disabled ? '#202633' : '',
              },
            }}
            variant={variant}
            style={{ width: '100%' }}
            placeholder={placeholder || ''}
            FormHelperTextProps={{
              style: {
                color: '#ffffff',
              },
            }}
            error={!!error}
            helperText={helperText || ''}
            {...field}
          />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </Box>
  );
};

export default UserInput;
