import { Text, Button, StyleVariables } from '@alcumus/components';
import { Grid, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';
import React from 'react';
import { QuestionnaireFields } from '../../../types/QuestionnaireField';
import SentenceInput from './SentenceInput/SentenceInput';

export interface QuestionnaireSentenceBuilderProps extends QuestionnaireFields {
  t: TFunction;
  tOptions: (x: string) => Array<string>;
  onSubmit: () => void;
  isSubmitting: boolean | undefined;
}

const useStyles = makeStyles({
  page: {
    backgroundColor: StyleVariables.colors.surface.default,
  },
  container: {
    fontFamily: StyleVariables.fonts.family.heading,
    padding: StyleVariables.spacing(4),
  },
  subheading: {
    marginTop: '10vh',
    fontWeight: 600,
  },
  questions: {
    marginTop: '5vh',
    fontWeight: 600,
    lineHeight: '2.5rem',
  },
  button: {
    marginTop: StyleVariables.spacing(4),
    minWidth: '120px',
  },
  backdrop: {
    color: StyleVariables.colors.surface.default,
    zIndex: 1,
  },
});

export default function QuestionnaireSentenceBuilder({
  t,
  tOptions,
  role,
  setRole,
  purpose,
  setPurpose,
  industry,
  setIndustry,
  teamSize,
  setTeamSize,
  isSubmitting,
  onSubmit,
}: QuestionnaireSentenceBuilderProps) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Hidden mdDown>
        <Grid item sm={2} />
      </Hidden>
      <Grid item xs={12} md={10}>
        <Grid item xs={12}>
          <Text className={classes.subheading} as="h5">
            {t('subheading')}
          </Text>
        </Grid>
        <Grid item xs={12}>
          <Text as="h4" className={classes.questions}>
            <SentenceInput
              t={t}
              onSelect={setRole}
              withCustomValue
              customValueLabel={t('noneOfTheAbove')}
              dropdownValue={role}
              options={tOptions('role')}
              fadeIn={true}
              data-testid="role"
              questionsTranslationKey="questions.role"
            />
            <SentenceInput
              onSelect={setIndustry}
              withCustomValue
              customValueLabel={t('noneOfTheAbove')}
              dropdownValue={industry}
              options={tOptions('industry')}
              t={t}
              fadeIn={!!role}
              data-testid="industry"
              questionsTranslationKey="questions.industry"
            />
            <br />
            <SentenceInput
              onSelect={setTeamSize}
              dropdownValue={teamSize}
              options={tOptions('teamSize')}
              t={t}
              fadeIn={!!industry}
              data-testid="teamSize"
              questionsTranslationKey="questions.teamSize"
            />
            <br />
            <SentenceInput
              onSelect={setPurpose}
              dropdownValue={purpose}
              options={tOptions('purpose')}
              t={t}
              fadeIn={!!teamSize}
              data-testid="purpose"
              questionsTranslationKey="questions.purpose"
            />
          </Text>
        </Grid>
        <Grid item xs={12} md={3}>
          {role && industry && teamSize && purpose && (
            <Button
              size="large"
              rounded
              className={classes.button}
              disabled={isSubmitting}
              data-testid="start-trial-btn"
              onClick={onSubmit}
              fullWidth={true}
              showLoadingIndicator={isSubmitting}
            >
              {t('startTrialButton')}
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
