import { connect } from 'react-redux';
import { RootReducerState } from '../../../../../client/redux/reducers';
import LaunchProduct from './LaunchProduct';

function mapStateToProps({ products, currentOrganization }: RootReducerState) {
  return {
    products: products.products,
    currentOrganization: currentOrganization.currentOrganization,
  };
}

export default connect(mapStateToProps)(LaunchProduct);
