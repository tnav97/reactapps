import { Request, Response } from 'express';
import { Types } from '@alcumus/core';
import { SplitFactory } from '@splitsoftware/splitio';
import addSplitTreatments from './addSplitTreatments';
import { IClient, IManager, ISDK } from '@splitsoftware/splitio/types/splitio';
import {
  SINGLE_PAGE,
  SENTENCE_BUILDER,
  WIZARD,
  MULTIPLE_PAGES,
} from '../../common/constants/treatments';

jest.mock('@splitsoftware/splitio');

const mockedSplitFactory = SplitFactory as jest.MockedFunction<
  typeof SplitFactory
>;

describe('Add Split Treatments Cookie Middleware', () => {
  let mockedNames: jest.Mock;
  let mockedGetTreatments: jest.Mock;
  const next = jest.fn();
  const res: Partial<Response> = {};
  const mockedTreatments = {
    'self-signup-questionnaire': 'questionnaire',
    'self-signup-register-form': 'form',
  };
  beforeAll(() => {
    mockedNames = jest.fn();
    mockedGetTreatments = jest.fn();

    mockedSplitFactory.mockReturnValue({
      manager: () =>
        ({
          names: mockedNames,
        } as unknown as IManager),
      client: () =>
        ({
          getTreatments: mockedGetTreatments,
        } as unknown as IClient),
    } as unknown as ISDK);

    mockedNames.mockReturnValue(['SPLIT_A']);
    mockedGetTreatments.mockReturnValue(mockedTreatments);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('calls next when no query is provided', () => {
    const req: Partial<Types.Request> = { query: {}, ip: 'REQ_IP' };
    const next = jest.fn();

    addSplitTreatments(req as Request, res as Response, next);

    expect(next).toBeCalled();
  });

  it('calls next when a query is provided', () => {
    const req: Partial<Types.Request> = { query: { a: 'a' }, ip: 'REQ_IP' };
    const next = jest.fn();

    addSplitTreatments(req as Request, res as Response, next);

    expect(next).toBeCalled();
  });

  it('passes request ip to Split Manager', () => {
    const req: Partial<Types.Request> = { query: {}, ip: 'REQ_IP' };

    addSplitTreatments(req as Request, res as Response, next);

    expect(mockedNames).toBeCalled();
    expect(mockedGetTreatments).toBeCalled();
    expect(mockedGetTreatments).toBeCalledWith('REQ_IP', ['SPLIT_A'], {});
  });

  it('passes request ip to Split Manager when query string is provided', () => {
    const req: Partial<Types.Request> = { query: { a: 'a' }, ip: 'REQ_IP' };

    addSplitTreatments(req as Request, res as Response, next);

    expect(mockedNames).toBeCalled();
    expect(mockedGetTreatments).toBeCalled();
    expect(mockedGetTreatments).toBeCalledWith('REQ_IP', ['SPLIT_A'], {});
  });

  it("it returns splits from split manager and set it into request's initialRequest", () => {
    const req: Partial<Types.Request> = {
      query: {},
      ip: 'REQ_IP',
    };
    const expected = { splitTreatments: { ...mockedTreatments } };

    addSplitTreatments(req as Request, res as Response, next);

    expect(req.initialState).toEqual(expected);
  });

  it('overrides treatments when forcedDesign is provided', () => {
    const req: Partial<Types.Request> = {
      query: { forceDesign: 'withSteps' },
      ip: 'REQ_IP',
    };

    const expected = { splitTreatments: { ...mockedTreatments } };

    addSplitTreatments(req as Request, res as Response, next);

    expect(req.initialState).not.toEqual(expected);
  });

  it('overrides correct treatments when forcedDesign equals to withSteps', () => {
    const req: Partial<Types.Request> = {
      query: { forceDesign: 'withSteps' },
      ip: 'REQ_IP',
    };
    const expected = {
      splitTreatments: {
        'self-signup-questionnaire': WIZARD,
        'self-signup-register-form': MULTIPLE_PAGES,
      },
    };

    addSplitTreatments(req as Request, res as Response, next);

    expect(req.initialState).toEqual(expected);
  });

  it('overrides correct treatments when forcedDesign equals to withoutSteps', () => {
    const req: Partial<Types.Request> = {
      query: { forceDesign: 'withoutSteps' },
      ip: 'REQ_IP',
    };
    const expected = {
      splitTreatments: {
        'self-signup-questionnaire': SENTENCE_BUILDER,
        'self-signup-register-form': SINGLE_PAGE,
      },
    };

    addSplitTreatments(req as Request, res as Response, next);

    expect(req.initialState).toEqual(expected);
  });
});
