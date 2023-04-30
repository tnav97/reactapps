import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export type MarketoChainable<TArg, T> = (callback: TArg) => MarketoForm<T>;
export type MarketoOnSuccessCallback<T> = (
  vals: T,
  followupUrl?: string | null
) => boolean | void;
export type MarketoCallback<T> = (form: MarketoForm<T>) => void;

export type MarketoFormOnSuccess<T> = MarketoChainable<
  MarketoOnSuccessCallback<T>,
  T
>;
export type MarketoFormOnSubmit<T> = MarketoChainable<MarketoCallback<T>, T>;

export interface MarketoForm<T> {
  onSuccess: MarketoFormOnSuccess<T>;
  onSubmit: MarketoFormOnSubmit<T>;
  submittable: (canSubmit?: boolean) => boolean | MarketoForm<T>;
  setValues: (values: T) => void;
  getValues: () => T;
  getId: () => number;
  loadForm: (
    baseUrl: string,
    munchkinId: string,
    formId: number | string,
    callback: MarketoCallback<T>
  ) => void;
  submit: () => MarketoForm<T>;
}

export interface UseMarketoProps<T> {
  baseUrl: string;
  munchkinId: string;
  formId: number;
  callback: MarketoCallback<T>;
}

export default function useMarketo<T>({
  baseUrl,
  munchkinId,
  formId,
  callback,
}: UseMarketoProps<T>) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded) {
      // @ts-ignore
      (window.MktoForms2 as MarketoForm).loadForm(
        baseUrl,
        munchkinId,
        formId,
        callback
      );
    }
    loadScript(baseUrl, setScriptLoaded);
  }, [scriptLoaded]);
}

function loadScript(
  baseUrl: string,
  setScriptLoaded: Dispatch<SetStateAction<boolean>>
) {
  // @ts-ignore
  if (window.MktoForms2) return setScriptLoaded(true);

  const script = document.createElement('script');
  script.src = `${baseUrl}/js/forms2/js/forms2.min.js`;
  // @ts-ignore
  script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null);
  document.body.appendChild(script);
}
