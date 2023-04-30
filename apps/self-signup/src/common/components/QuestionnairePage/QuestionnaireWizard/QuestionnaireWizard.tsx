import { Grid } from '@mui/material';
import { TFunction } from 'i18next';
import React, { useEffect, useState } from 'react';
import StepIndicator from '../../StepIndicator';
import { QuestionnaireFields } from '../../../types/QuestionnaireField';
import QuestionnaireStep, {
  QuestionnaireStepOption,
} from './QuestionnaireStep/QuestionnaireStep';

export interface QuestionnaireWizardProps extends QuestionnaireFields {
  t: TFunction;
  tOptions: (x: string) => Array<string>;
  onSubmit: () => void;
  isSubmitting: boolean | undefined;
}

export default function QuestionnaireWizard({
  t,
  setRole,
  setIndustry,
  setPurpose,
  setTeamSize,
  onSubmit,
}: QuestionnaireWizardProps) {
  const [step, setStep] = useState(1);

  const translatedOptionsToQuestionnaireOptions = (key: string) =>
    (
      t(`optionsForSteps.${key}`, {
        returnObjects: true,
        defaultValue: [],
      }) as Array<QuestionnaireStepOption>
    ).map(({ value, illustration }) => ({
      value,
      label: value,
      illustration: illustration && `/images/illustrations/${illustration}`,
    }));

  const nextStep = (handler: Function, value: string) => {
    handler(value);
    if (step <= 4) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (step > 4) {
      onSubmit();
    }
  }, [step]);

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const stepIndicator = <StepIndicator total={4} current={step} />;

  return (
    <Grid container>
      <Grid item xs={12}>
        {step === 1 && (
          <QuestionnaireStep
            t={t}
            stepIndicator={stepIndicator}
            title={t('fullQuestions.role')}
            options={translatedOptionsToQuestionnaireOptions('role')}
            onOptionSelect={(value) => nextStep(setRole, value)}
            onCustomValue={(value) => nextStep(setRole, value)}
          />
        )}
        {step === 2 && (
          <QuestionnaireStep
            t={t}
            stepIndicator={stepIndicator}
            title={t('fullQuestions.industry')}
            options={translatedOptionsToQuestionnaireOptions('industry')}
            onOptionSelect={(value) => nextStep(setIndustry, value)}
            onCustomValue={(value) => nextStep(setIndustry, value)}
            onPrevious={previousStep}
          />
        )}
        {step === 3 && (
          <QuestionnaireStep
            t={t}
            stepIndicator={stepIndicator}
            title={t('fullQuestions.teamSize')}
            options={translatedOptionsToQuestionnaireOptions('teamSize')}
            onOptionSelect={(value) => nextStep(setTeamSize, value)}
            onCustomValue={(value) => nextStep(setTeamSize, value)}
            onPrevious={previousStep}
          />
        )}
        {step === 4 && (
          <QuestionnaireStep
            t={t}
            stepIndicator={stepIndicator}
            title={t('fullQuestions.purpose')}
            options={translatedOptionsToQuestionnaireOptions('purpose')}
            onOptionSelect={(value) => nextStep(setPurpose, value)}
            onCustomValue={(value) => nextStep(setPurpose, value)}
            onPrevious={previousStep}
          />
        )}
      </Grid>
    </Grid>
  );
}
