import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { LoadingPage } from '@alcumus/components';
import { Product } from '../../types';
import { LoginFlowHooks } from '../../hooks/LoginLogoutFlow';

const useStyles = makeStyles(() => ({
  hideElement: {
    display: 'none',
  },
  loaderContainer: {
    padding: '3rem',
  },
}));

interface AppLauncherProps {
  products: Product[];
  productToLaunch: string;
  callbackUrl: string;
  accessToken?: string;
  accessTokenExpiry?: number;
  refreshToken: string;
  isLoginFlow?: boolean;
  isAuthorizationFlow?: boolean;
}

export default function AppLauncher({
  products,
  productToLaunch,
  callbackUrl,
  accessToken,
  accessTokenExpiry,
  refreshToken,
  isLoginFlow = false,
}: AppLauncherProps) {
  const [isLaunchingApp, setIsLaunchingApp] = useState<boolean>(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const classes = useStyles();

  const app =
    !!productToLaunch.trim().length &&
    products.find((p) => p.productCode === productToLaunch);

  // Launch app using background form post
  useEffect(() => {
    if (!isLaunchingApp && app) {
      if (isLoginFlow) {
        LoginFlowHooks.storeSuccessfulLoginAttempt();
        LoginFlowHooks.clearTemporaryValues();
      }
      const submitButton = submitButtonRef.current as HTMLButtonElement;
      setIsLaunchingApp(true);
      submitButton.click();
    }
  }, [isLaunchingApp, app, submitButtonRef.current]);

  if (!app) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <LoadingPage
        message={`Launching ${app.name}...`}
        logoImageUrl="/images/alcumus-logo-with-tagline.svg"
      />
      <div className={classes.hideElement}>
        <form method="POST" action={callbackUrl}>
          <input type="hidden" name="accessToken" value={accessToken} />
          <input
            type="hidden"
            name="accessTokenExpiry"
            value={accessTokenExpiry}
          />
          <input type="hidden" name="refreshToken" value={refreshToken} />
          <button ref={submitButtonRef} type="submit" />
        </form>
      </div>
    </React.Fragment>
  );
}
