import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { IControlButtonsProps } from '../types/types';

const ControlButtons = ({ stateProps }: IControlButtonsProps) => {
  const theme = useTheme();

  const { handleOnToggleCheckbox, handleOnEdit, handleDeleteButton, isTaskCompleted, isFocused, isTextError } =
    stateProps;

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Checkbox
        onChange={handleOnToggleCheckbox}
        value={isTaskCompleted}
        checked={isTaskCompleted}
        disabled={isFocused}
        color="secondary"
        edge="end"
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          mr: 0,
          transition: theme.transitions.create(['all'], {
            duration: theme.transitions.duration.standard,
          }),
        }}
      />
      <IconButton
        disabled={isTaskCompleted || isTextError.isShow}
        sx={{
          minWidth: '42px',
          opacity: isTaskCompleted || isTextError.isShow ? 0.5 : 1,
          transition: theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.standard,
          }),
        }}
        onClick={handleOnEdit}
      >
        {isFocused ? (
          <SaveIcon sx={{ color: theme.palette.primary.main }} />
        ) : (
          <EditIcon sx={{ color: theme.palette.primary.main }} />
        )}
      </IconButton>

      <IconButton sx={{ minWidth: '42px' }} onClick={handleDeleteButton}>
        <DeleteIcon sx={{ color: theme.palette.error.main }} />
      </IconButton>
    </Box>
  );
};

export default ControlButtons;
