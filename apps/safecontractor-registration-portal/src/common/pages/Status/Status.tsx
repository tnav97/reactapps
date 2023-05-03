import React, { useEffect, useState } from 'react';
import { Page } from '@alcumus/components';
import { Typography } from '@mui/material';

interface StatusSection {
  validateStatusHealth: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}
export default function Status(statusSectionProps: StatusSection) {
  const [statusMessage, setStatusMessage] = useState('');
  useEffect(() => {
    statusSectionProps.validateStatusHealth().then((res) => {
      setStatusMessage(JSON.stringify(res?.payload?.response));
    });
  }, []);

  return (
    <Page>
      <Typography>{statusMessage}</Typography>
    </Page>
  );
}
