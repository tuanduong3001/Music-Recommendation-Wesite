import React from 'react';
import { Controller,FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { styled, TextField, TextFieldProps, Theme, Typography, SxProps, Box, TypographyProps, alpha } from '@mui/material';

export const BootstrapInput = styled(TextField)(({ theme }) => ({
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
interface CreateFilmInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  requiredIcon?: boolean;
  label?: string;
  type?:string;
  placeholder?: string;
  onKeyUp?:(e:any)=>void;
  disabled?: boolean;
  hidden?:boolean;
  onChange1?: (e:any)=> void;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  inputHeight?: string;
  sx?: SxProps<Theme>;
}

const CreateFilmInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  helperText,
  type,
  onChange1,
  onKeyUp,
  hidden=false,
  placeholder,
  defaultValue = undefined,
  variant = 'outlined',
  disabled = false,
  ...props
}: CreateFilmInput<TFieldValues, TName>) => {
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
        render={({ field: { onChange, onBlur, value, name, ref }  }) => (
          <BootstrapInput 
            onChange={(event:any) => {  
           if(onChange1){
            onChange1(event);
           }
            onChange(event.target.value);
            }}
            onKeyUp={(event:any)=>{
              if(onKeyUp){
                onKeyUp(event)
              }
            }}
            defaultValue={defaultValue}
            disabled={disabled}
            
            type={type || "text"}
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
            ref={ref}
            name={name}
          />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </Box>
  );
};

export default CreateFilmInput;
