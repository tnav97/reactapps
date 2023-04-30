import { withTranslation } from 'react-i18next';
import ProductPlansPage from './PlansPage';
import { connect } from 'react-redux';
import { Plan } from '../../../types/plans';
import { Actions } from '../../../client/redux/actions';
import { BillingFrequency } from '../../../types/billingFrequency';

const mapStateToProps = (state) => ({
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onPlanSelected: ({
      plan,
      billingFrequency,
    }: {
      plan: Plan;
      billingFrequency: BillingFrequency;
    }) => {
      dispatch({
        type: Actions.Review.Set,
        payload: {
          plan,
          billingFrequency,
        },
      });
    },
  };
};

export default withTranslation('plansPage')(
  connect(mapStateToProps, mapDispatchToProps)(ProductPlansPage)
);
