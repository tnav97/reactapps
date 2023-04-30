import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { StyleVariables } from '@alcumus/components';

interface MessageProps {
  getApiMessage: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const useStyles = makeStyles(() => ({
  loadingMessage: {
    color: StyleVariables.colors.text.subdued,
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
}));

export default function Message({
  messageFromApi,
  isFetching = false,
  error,
  getApiMessage,
}: MessageProps) {
  const classes = useStyles();
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!isFetching && !error && !messageFromApi) {
      getApiMessage();
    } else if (messageFromApi && !message) {
      setMessage(messageFromApi);
    }
  }, [messageFromApi, isFetching, error, message, getApiMessage]);

  return (
    <React.Fragment>
      {isFetching && (
        <Typography variant="h5" className={classes.loadingMessage}>
          Fetching message from API
        </Typography>
      )}
      {error ? (
        <Typography variant="h5" className={classes.error}>
          {error}
        </Typography>
      ) : (
        <Typography variant="h5">{message}</Typography>
      )}
    </React.Fragment>
  );
}
