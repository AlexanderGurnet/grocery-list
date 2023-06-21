import { Card, Box, CircularProgress, Fade, TextField, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import groceryApi from '../pages/api/api';
import useInputValidation from '../hooks/useInputValidation';
import CustomAlert from './CustomAlert';
import { IFormProps } from '../types/types';

const Form = ({ inputLabel }: IFormProps) => {
  const queryClient = useQueryClient();

  const { isLoading: isAddingNewEntryLoading, mutate: addNewEntry } = useMutation({
    mutationFn: groceryApi.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const {
    text: groceryText,
    handleOnBlur: handleInputOnBlur,
    handleOnChange: handleInputOnChange,
    handleOnClick,
    handleOnKeyDown,
    error: isTextError,
  } = useInputValidation({ resetInput: true });

  const handleInputKeyDown = (e: React.KeyboardEvent<any>) => {
    handleOnKeyDown(e, () => {
      addNewEntry({ id: uuidv4(), text: groceryText, amount: 1, isFinished: false });
    });
  };

  const handleButtonOnClick = () => {
    handleOnClick(() => addNewEntry({ id: uuidv4(), text: groceryText, amount: 1, isFinished: false }));
  };

  const isDisabled = groceryText.length === 0 || groceryText.length >= 40;

  return (
    <>
      <Card
        component="form"
        variant="outlined"
        sx={{
          px: 3,
          py: 3,
          mb: 1,
          display: 'flex',
          flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ minWidth: { lg: '50%', md: '50%', sm: '50%', xs: '100%' } }}>
          <TextField
            fullWidth
            label={inputLabel}
            onChange={handleInputOnChange}
            onBlur={handleInputOnBlur}
            onKeyDown={handleInputKeyDown}
            value={groceryText}
            variant="outlined"
            size="small"
            autoComplete="off"
          />
        </Box>

        <Button
          size="small"
          type="button"
          sx={{
            my: { lg: 1, md: 1, sm: 1, xs: 2 },
            maxWidth: { lg: '200px', md: '200px', sm: '200px', xs: '100%' },
            display: 'flex',
            gap: 2,
          }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleButtonOnClick}
          disabled={isDisabled}
        >
          <Fade in={isAddingNewEntryLoading}>
            <CircularProgress sx={{ position: 'absolute', left: '12px' }} size={20} color="primary" />
          </Fade>
          Add Item
        </Button>
      </Card>
      <CustomAlert trigger={isTextError.isShow} text={isTextError.text} type="error" />
    </>
  );
};

export default Form;
