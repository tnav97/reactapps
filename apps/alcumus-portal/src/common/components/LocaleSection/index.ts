import { withTranslation } from 'react-i18next';
import { LocaleSection } from './LocaleSection';
import { UserReducerState } from '../../../client/redux/reducers/user';
import { connect } from 'react-redux';

function mapStateToProps({ user }: { user: UserReducerState }) {
  return {
    location: user?.location,
    locale: user?.locale,
    timezone: user?.timezone,
  };
}

function mapDispatchToProps() {
  return {};
}

export default withTranslation('MyAccount')(
  connect(mapStateToProps, mapDispatchToProps)(LocaleSection)
);
