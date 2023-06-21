import { Alert, Collapse } from '@mui/material';

import { ICustomAlertProps } from '../types/types';

const CustomAlert = ({ trigger, timeout = 500, text, type, styles = { my: 1 } }: ICustomAlertProps) => {
  return (
    <Collapse in={trigger} timeout={timeout}>
      <Alert severity={type} sx={styles}>
        {text}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
