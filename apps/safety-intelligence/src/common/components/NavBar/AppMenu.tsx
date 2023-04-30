import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Text, StyleVariables } from '@alcumus/components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { currentApp, userAppsState } from '../PrivateRoute/PrivateRoute';
import SingleSelectDropdown, {
  MenuItems,
} from '../shared/SingleSelectDropdown';

type Props = {
  disabled?: boolean;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      color: StyleVariables.colors.text.default,
      paddingRight: theme.spacing(1),
    },
    formControl: {
      minWidth: theme.spacing(30),
    },
  })
);

export default function AppMenu({ disabled }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const [app, setApp] = useRecoilState(currentApp);
  const [apps] = useRecoilState(userAppsState);
  const { t } = useTranslation('AriaLabels');

  const getMenuItems = (): MenuItems[] => {
    return apps.map((item) => {
      return { value: item.appId, displayName: item.appDisplayName };
    });
  };

  const handleChange = (event) => {
    localStorage.setItem('application_id', event.target.value);
    localStorage.removeItem('user_external_id');
    setApp(event.target.value);
    history.push('/');
  };

  return (
    <>
      <Text as="h6" className={classes.title}>
        Data from
      </Text>
      <SingleSelectDropdown
        value={app}
        id="context-chooser"
        handleChange={handleChange}
        formControlClassName={classes.formControl}
        disabled={disabled}
        aria-label={t('contextChooser', { ns: 'AriaLabels' })}
      >
        {getMenuItems()}
      </SingleSelectDropdown>
    </>
  );
}
