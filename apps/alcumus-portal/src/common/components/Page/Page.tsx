import React, {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
} from 'react';
import qs from 'querystring';
import store from 'store';
import { Page as AcPage, StyleVariables } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  page: {
    backgroundColor: StyleVariables.colors.background.default,
  },
}));

interface PageProps {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
  [x: string]: any;
}

export default function Page({ children, ...rest }: PageProps) {
  const classes = useStyles();
  const location = useLocation();
  const {
    p: productCode,
    cu: callbackUrl,
    oi: organizationIdentifier,
  } = qs.parse(location.search.substring(1));

  useEffect(() => {
    if (productCode) {
      store.set('product', productCode);
    }
    if (callbackUrl) {
      store.set('callbackUrl', callbackUrl);
    }
    if (organizationIdentifier) {
      store.set('organizationIdentifier', organizationIdentifier);
    }
  }, []);

  return (
    <AcPage className={classes.page} {...rest}>
      {children}
    </AcPage>
  );
}
