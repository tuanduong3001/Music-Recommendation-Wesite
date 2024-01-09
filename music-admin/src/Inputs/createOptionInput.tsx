import React from 'react';
import { Controller,FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { styled, TextField, TextFieldProps, Theme, Typography, SxProps, Box, TypographyProps, alpha, Autocomplete } from '@mui/material';

const BootstrapInput = styled(TextField)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
const ErrorText = styled(Typography)<TypographyProps>({
  marginTop: '10px',
  color: '#FF6150',
});
interface CreateOptionInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  requiredIcon?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange1: (e:any, item:any)=> void;
  options?:any;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  inputHeight?: string;
  sx?: SxProps<Theme>;
}

const CreateOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  helperText,
  options,
  onChange1,
  placeholder,
  defaultValue = undefined,
  variant = 'outlined',
  disabled = false,
  ...props
}: CreateOptionInput<TFieldValues, TName>) => {
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
      marginTop: '20px',
    }}>
      <Controller
        name={name}
        control={control}
       
        defaultValue={defaultValue} 
        render={({ field:{onChange, value} }) => (
          <Autocomplete
           disableClearable
            onChange={(event, item) => {  
                onChange1(event, item);
                onChange(item);
            }}
            defaultValue={defaultValue !== undefined ? defaultValue : ''}
            disabled={disabled}
            style={{ width: '100%' }}
            placeholder={placeholder || ''}
            options={options && options.map((item: any) => ({ id: item.id, label: item.name }))}
            renderInput={(params: any) => <TextField {...params} data-test="banner" label={name} />}
          />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </Box>
  );
};

export default CreateOptionInput;
