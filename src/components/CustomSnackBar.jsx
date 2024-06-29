import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';

function MyApp({ message, type }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, {
        variant: type,
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} color="inherit">
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  }, [message, type, enqueueSnackbar, closeSnackbar]);

  return null; // This component does not render anything directly
}

export default function CustomSnackBar({ message, type }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp message={message} type={type} />
    </SnackbarProvider>
  );
}
