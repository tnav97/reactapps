import { Text, Button, Input, StyleVariables } from '@alcumus/components';
import { useStateFromInput } from '@alcumus/hooks';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import React, { ReactNode } from 'react';
import QuestionnaireTile from './QuestionnaireTile/QuestionnaireTile';

export interface QuestionnaireStepOption {
  value: string;
  label: string;
  illustration?: string;
}

export interface QuestionnaireStepProps {
  t: TFunction;
  title: string;
  options: Array<QuestionnaireStepOption>;
  stepIndicator?: ReactNode;
  onOptionSelect: (value: string) => void;
  onCustomValue?: (value: string) => void;
  onPrevious?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: StyleVariables.spacing(6),
    paddingBottom: StyleVariables.spacing(20),
  },
  title: {
    fontWeight: 600,
    marginBottom: StyleVariables.spacing(7),
  },
  tile: {
    margin: StyleVariables.spacing(1),
    width: '200px',
  },
  inputLabel: {
    marginTop: StyleVariables.spacing(6),
    marginBottom: StyleVariables.spacing(1),
    fontWeight: 500,
  },
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: StyleVariables.colors.surface.neutral?.disabled,
    padding: `${StyleVariables.spacing(4)} ${StyleVariables.spacing(6)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.only('xs')]: {
      padding: `${StyleVariables.spacing(2)}`,
    },
  },
  previousBtn: {
    display: 'flex',
  },
  nextBtn: {
    display: 'flex',
  },
  previousIcon: {
    color: StyleVariables.colors.icon.default,
    marginRight: StyleVariables.spacing(1),
  },
  hidden: {
    visibility: 'hidden',
  },
}));

export default function QuestionnaireStep({
  t,
  title,
  options,
  onOptionSelect,
  onCustomValue,
  onPrevious,
  stepIndicator,
}: QuestionnaireStepProps) {
  const classes = useStyles();

  const [input, handleSetInputValue] = useStateFromInput('');

  const formId = `questionnaire-step-form-${(Math.random() * 1000).toFixed(0)}`;

  const onSubmit = (e) => {
    e.preventDefault();

    if (onCustomValue) {
      onCustomValue(input);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item xs={12}>
        <Text as="h3" center className={classes.title}>
          {title}
        </Text>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          {options.map((option: QuestionnaireStepOption) => (
            <QuestionnaireTile
              key={option.value}
              className={classes.tile}
              title={option.label}
              illustration={option.illustration}
              onClick={() => onOptionSelect(option.value)}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={10} md={4}>
        <Text as="h5" className={classes.inputLabel} center>
          {t('noneOfTheAbove')}
        </Text>
        <form id={formId} onSubmit={onSubmit}>
          <Input
            data-testid="custom-value-input"
            onChange={handleSetInputValue}
          />
        </form>
      </Grid>
      <div className={classes.bottomBar}>
        <Button
          variant="outlined"
          className={clsx([
            classes.previousBtn,
            { [classes.hidden]: !onPrevious },
          ])}
          rounded
          startIcon={<KeyboardArrowLeft />}
          data-testid="previous"
          onClick={() => onPrevious && onPrevious()}
        >
          {t('previous')}
        </Button>
        <div>{stepIndicator}</div>
        <Button
          variant="outlined"
          type="submit"
          form={formId}
          className={clsx([classes.nextBtn, { [classes.hidden]: !input }])}
          rounded
          endIcon={<KeyboardArrowRight />}
          data-testid="next"
          onClick={() => {}}
        >
          {t('next')}
        </Button>
      </div>
    </Grid>
  );
}
