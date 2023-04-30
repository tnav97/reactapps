import ProductPage, { ProductPageProps } from './ProductPage';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';

function mapStateToProps({
  authorization,
  user,
  currentOrganization,
}: RootReducerState) {
  return {
    isAdmin: authorization?.loggedInUserRole?.roleLookupKey
      .toLowerCase()
      .includes('admin'),
    user,
    currentOrganization: currentOrganization?.currentOrganization,
  };
}

export { ProductPageProps };
export default withTranslation('ProductPage')(
  connect(mapStateToProps)(ProductPage)
);
