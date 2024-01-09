import React, { useState } from 'react';
import { Controller, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Input = styled(OutlinedInput)<OutlinedInputProps>({
  input: {
    '&::placeholder': {
      color: '#2F3C51',
      opacity: 1,
    },
    
  },
  
  '& .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #2F3C51',
    borderRadius: '8px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#2F3C51',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#6A78FA',
  },
  '& .MuiInputAdornment-root button': {
    color: '#2F3C51',
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF6150',
  },

  'input:-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 30px #19202D inset !important',
    '-webkit-text-fill-color': '#fff !important',
  },
});

const ErrorText = styled(Typography)<TypographyProps>({
  fontSize: '12px',
  color: '#FF6150',
  fontWeight: 400,
  marginTop: '10px',
});
interface PasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  helperText?: string;
  placeholder?: string;
  requriedIcon?: boolean;
}
const PasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  defaultValue,
  placeholder,
  ...props
}: PasswordInputProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue,
  });
  return (
    <Box
      {...props}
      sx={{
        marginTop: '10px',
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            error={!!error}
            style={{ width: '100%' }}
            {...field}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            
          />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </Box>
  );
};

export default PasswordInput;
