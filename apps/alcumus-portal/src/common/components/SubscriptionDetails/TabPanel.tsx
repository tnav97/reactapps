import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  value: string;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, id, ...other } = props;

  return (
    <div hidden={value !== id} {...other}>
      {children}
    </div>
  );
}
