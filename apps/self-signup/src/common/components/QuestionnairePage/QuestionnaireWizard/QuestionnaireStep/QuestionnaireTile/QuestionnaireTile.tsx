import { Text, StyleVariables } from '@alcumus/components';
import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

export interface QuestionnaireTileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title: string;
  illustration?: string;
  onClick: () => void;
}

const useStyles = makeStyles({
  container: {
    minHeight: '248px',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${StyleVariables.colors.border.default}`,
    borderRadius: StyleVariables.spacing(1),
    padding: StyleVariables.spacing(3),
    textAlign: 'center',
    cursor: 'pointer',
    transition: '100ms linear',
    background: StyleVariables.colors.surface.default,
    '&:hover': {
      background: alpha(StyleVariables.colors.interactive.default, 0.05),
      borderColor: StyleVariables.colors.interactive.default,
    },
    '&:active': {
      background: alpha(StyleVariables.colors.interactive.default, 0.15),
      borderColor: StyleVariables.colors.interactive.default,
    },
  },
  withIllustration: {
    justifyContent: 'space-between',
  },
  illustration: {
    width: '100%',
    height: '100%',
    margin: StyleVariables.spacing(3),
  },
});

export default function QuestionnaireTile(props: QuestionnaireTileProps) {
  const classes = useStyles(props);
  const { title, illustration } = props;

  return (
    <button
      className={clsx([
        classes.container,
        { [classes.withIllustration]: !!illustration },
        props.className,
      ])}
      data-testid={`questionnaire-tile-${title}`}
      onClick={props.onClick}
    >
      {!illustration ? (
        <Text as="h4">{title}</Text>
      ) : (
        <>
          <Text as="h5" className={clsx(['title'])}>
            {title}
          </Text>
          <img
            src={illustration}
            data-testid="illustration"
            className={clsx([classes.illustration])}
          />
        </>
      )}
    </button>
  );
}
