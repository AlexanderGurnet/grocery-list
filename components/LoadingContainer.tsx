import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ILoadingContainerProps } from '../types/types';

const LoadingContainer = ({ stateProps }: ILoadingContainerProps) => {
  const { isUpdatingAmountLoading, isChangingEntry, isDeletionLoading, isCompletionLoading } = stateProps;
  return (
    <Box
      sx={{
        width: '40px',
        minHeight: '56px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Fade in={isUpdatingAmountLoading || isChangingEntry} mountOnEnter unmountOnExit>
        <CircularProgress size={25} color="primary" />
      </Fade>
      <Fade in={isDeletionLoading} mountOnEnter unmountOnExit>
        <CircularProgress size={25} color="error" />
      </Fade>
      <Fade in={isCompletionLoading} mountOnEnter unmountOnExit>
        <CircularProgress size={25} color="secondary" />
      </Fade>
    </Box>
  );
};

export default LoadingContainer;
