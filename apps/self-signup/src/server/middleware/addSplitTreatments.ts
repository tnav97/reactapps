import { NextFunction, Response } from 'express';
import SplitManager from '../splitManager';
import { Types } from '@alcumus/core';
import {
  SINGLE_PAGE,
  SENTENCE_BUILDER,
  WIZARD,
  MULTIPLE_PAGES,
} from '../../common/constants/treatments';

export default async function addSplitTreatments(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  const treatments = SplitManager.getInstance().getAllTreatments(req.ip);
  req.initialState = {
    ...req.initialState,
    splitTreatments: { ...treatments, ...getTreatmentOverrides(req) },
  };

  next();
}

function getTreatmentOverrides(req: Types.Request) {
  const { forceDesign } = req.query;
  if (forceDesign === 'withoutSteps')
    return {
      'self-signup-register-form': SINGLE_PAGE,
      'self-signup-questionnaire': SENTENCE_BUILDER,
    };
  else if (forceDesign === 'withSteps')
    return {
      'self-signup-register-form': MULTIPLE_PAGES,
      'self-signup-questionnaire': WIZARD,
    };
  return {};
}
