import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import useCompletion from '../hooks/useCompletion';
import useDeletion from '../hooks/useDeletion';
import useUpdatingAmount from '../hooks/useUpdatingAmount';
import useUpdatingEntry from '../hooks/useUpdatingEntry';
import ItemContainer from './ItemContainer';
import CustomAlert from './CustomAlert';
import ControlButtons from './ContolButtons';
import LoadingContainer from './LoadingContainer';
import { IGroceryItemProps } from '../types/types';

const ListItem = ({ data }: IGroceryItemProps) => {
  const { text, amount, isFinished, id } = data;
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const {
    isCompleted: isTaskCompleted,
    isLoading: isCompletionLoading,
    handleOnCompletion: handleOnToggleCheckbox,
  } = useCompletion({ defaultValue: isFinished, id });

  const { isLoading: isDeletionLoading, handleOnDeletion: handleDeleteButton } = useDeletion(id);

  const {
    isUpdatingError,
    isUpdatingAmountLoading,
    validatedUpdating: validatedAmount,
    handleUpdatingOnBlur,
    handleUpdatingOnChange,
  } = useUpdatingAmount({ amount, id });

  const { entryText, isTextError, isFocused, isChangingEntry, handleOnEdit, handleInputOnChange, handleInputKeyDown } =
    useUpdatingEntry({ text, id, inputRef });

  const borderColor = isTaskCompleted
    ? theme.palette.secondary.light
    : isFocused
    ? theme.palette.primary.light
    : 'none';

  return (
    <>
      <ItemContainer borderColor={borderColor}>
        <TextField
          inputRef={inputRef}
          focused={isFocused}
          onChange={handleInputOnChange}
          onKeyDown={handleInputKeyDown}
          value={entryText}
          InputProps={{
            inputProps: {
              readOnly: !isFocused,
              style: {
                fontSize: '1.5rem',
                textAlign: 'left',
              },
            },
          }}
          sx={{
            textDecoration: isTaskCompleted ? 'line-through' : 'none',
            textDecorationThickness: '0.4rem',
            wordBreak: 'break-word',
            width: '100%',
            fontSize: '50px',
            textDecorationColor: theme.palette.secondary.dark,
            flexGrow: 1,
          }}
          fullWidth
          variant="standard"
          size="small"
          autoComplete="off"
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <LoadingContainer
            stateProps={{ isUpdatingAmountLoading, isChangingEntry, isDeletionLoading, isCompletionLoading }}
          />
          <TextField
            label="Amount"
            type="number"
            onChange={handleUpdatingOnChange}
            onBlur={handleUpdatingOnBlur}
            sx={{
              width: '80px',
              mr: 2,
            }}
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={validatedAmount}
          />

          <ControlButtons
            stateProps={{
              handleOnToggleCheckbox,
              handleOnEdit,
              handleDeleteButton,
              isTaskCompleted,
              isFocused,
              isTextError,
            }}
          />
        </Box>
      </ItemContainer>
      <CustomAlert
        trigger={isUpdatingError.isShow || isTextError.isShow}
        type="error"
        styles={{ mb: 2 }}
        text={isUpdatingError.text || isTextError.text}
      />
    </>
  );
};

export default ListItem;
