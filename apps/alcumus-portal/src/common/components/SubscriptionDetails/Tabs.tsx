import { StyleVariables } from '@alcumus/components';
import { Tab, Tabs as MuiTabs } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { TabPanel } from './TabPanel';

export interface TabsProps {
  children: React.ReactNode;
  labels: Array<string>;
  disabledLabels?: Array<string>;
}

const useStyles = makeStyles({
  tabs: {
    borderBottom: `2px solid ${StyleVariables.colors.border.default}`,
  },
  tab: { textTransform: 'none' },
  selectedTab: {
    borderBottom: `4px solid ${StyleVariables.colors.border.active}`,
  },
});
export function Tabs({ children, labels, disabledLabels }: TabsProps) {
  const classes = useStyles();
  const [tab, setTab] = useState<string>(labels[0]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  if (!children || labels.length !== React.Children.count(children)) {
    return <>Children count must match labels count</>;
  } else {
    return (
      <div>
        <MuiTabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          classes={{ root: classes.tabs }}
        >
          {labels.map((label) => (
            <Tab
              value={label}
              label={label}
              classes={{ root: classes.tab, selected: classes.selectedTab }}
              key={label}
              disableRipple
              disabled={disabledLabels?.includes(label)}
            />
          ))}
        </MuiTabs>
        {labels.map((label, index) => (
          <TabPanel key={label} value={tab} id={label}>
            {/**
             * When a single child is passed
             * children is not an array
             *  */}
            {Array.isArray(children) ? children[index] : children}
          </TabPanel>
        ))}
      </div>
    );
  }
}
