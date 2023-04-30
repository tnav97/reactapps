import axios from 'axios';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterFormData } from '../../../client/redux/reducers/register-reducer';
import { Category, EventName } from '../../../lib/clients/eventsAnalytics';
import Analytics from '@alcumus/analytics-package';
import QuestionnaireSentenceBuilder from './QuestionnaireSentenceBuilder/QuestionnaireSentenceBuilder';
import QuestionnaireWizard from './QuestionnaireWizard/QuestionnaireWizard';
import {
  TranslateReady,
  PageWithNavbar as SelfSignupPage,
} from '@alcumus/components';
import environmentVariables from '../../environmentVariables';
import ReCAPTCHA from 'react-google-recaptcha';
import { Constants } from '@alcumus/core';
import { FeatureToggles } from '../../constants/featureToggles';

export enum QuestionnaireVariant {
  WIZARD = 'Wizard',
  SENTENCE_BUILDER = 'Sentence builder',
}

export interface QuestionnaireProps {
  t: TFunction;
  tReady: boolean;
  form: RegisterFormData;
  setForm: (form: RegisterFormData) => void;
  variant: QuestionnaireVariant;
}

const startFreeTrial = async (form, recaptchaToken = '') => {
  try {
    return (
      await axios.post('/api/startFreeTrial', form, {
        headers: {
          [Constants.RequestHeaders.ReCAPTCHAToken]: recaptchaToken,
        },
      })
    ).data;
  } catch (e: any) {
    console.error(e.response);
    throw e;
  }
};

function getAnalyticsVariant(questionnaireVariant: QuestionnaireVariant) {
  return {
    'Design Variant': questionnaireVariant,
  };
}

function useStateAndTrack<T>(
  defaultValue: T,
  trackCategory: Category,
  trackEventName: EventName,
  variant: QuestionnaireVariant
): [T, (T) => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const handler = (value: T) => {
    setValue(value);
    Analytics.getInstance().trackWithCategory(trackCategory, trackEventName, {
      value,
      ...getAnalyticsVariant(variant),
    });
  };
  return [value, handler];
}

export default function Questionnaire({
  t,
  tReady,
  form,
  setForm,
  variant = QuestionnaireVariant.SENTENCE_BUILDER,
}: QuestionnaireProps) {
  const analytics = Analytics.getInstance();
  const history = useHistory();
  const [role, setRole] = useStateAndTrack<string>(
    form.role || '',
    'Questionnaire',
    'Job Role Selected',
    variant
  );
  const [industry, setIndustry] = useStateAndTrack<string>(
    form.industry || '',
    'Questionnaire',
    'Industry Selected',
    variant
  );
  const [teamSize, setTeamSize] = useStateAndTrack<string>(
    form.teamSize || '',
    'Questionnaire',
    'Company Size Selected',
    variant
  );
  const [purpose, setPurpose] = useStateAndTrack<string>(
    form.purpose || '',
    'Questionnaire',
    'Use Case Selected',
    variant
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Retrieve the translated options - used for keeping the code clean
  const tOptions = (key: string): Array<string> =>
    t(`options.${key}`, {
      returnObjects: true,
      defaultValue: [],
    }) as Array<string>;

  const recaptchaRef = React.useRef<ReCAPTCHA>();

  const onSubmit = async () => {
    setIsSubmitting(true);
    const answers = {
      role,
      industry,
      teamSize,
      purpose,
    };
    const { organizationId, employeeProfileId } = form;
    let recaptchaToken;
    if (FeatureToggles.useRecaptcha()) {
      recaptchaToken = await recaptchaRef.current.executeAsync();
    }
    await startFreeTrial(
      {
        ...answers,
        organizationId,
        employeeProfileId,
      },
      recaptchaToken
    );
    setForm(answers);
    if (form && form.email) {
      analytics.trackWithCategory('Questionnaire', 'Free Trial Initiated', {
        ...answers,
        ...getAnalyticsVariant(variant),
      });
    }
    history.push('/verify-account');
  };

  const componentProps = {
    t,
    tOptions,
    onSubmit,
    role,
    purpose,
    teamSize,
    industry,
    isSubmitting,
    setRole,
    setIndustry,
    setPurpose,
    setTeamSize,
  };

  return (
    <TranslateReady tReady={tReady}>
      <SelfSignupPage>
        {FeatureToggles.useRecaptcha() && (
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={environmentVariables.SELF_SIGNUP_RECAPTCHA_SITE_KEY}
          />
        )}
        {variant === QuestionnaireVariant.WIZARD ? (
          <QuestionnaireWizard {...componentProps} />
        ) : (
          <QuestionnaireSentenceBuilder {...componentProps} />
        )}
      </SelfSignupPage>
    </TranslateReady>
  );
}
