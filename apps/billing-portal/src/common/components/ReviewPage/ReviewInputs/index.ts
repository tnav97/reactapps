import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ReviewInputs from './ReviewInputs';
import { Plan } from '../../../../types/plans';
import { IReviewReducerState } from '../../../../client/redux/reducers/reviewReducer';
import { Actions } from '../../../../client/redux/actions';
import { BillingFrequency } from '../../../../types/billingFrequency';

const mapStateToProps = (state: {
  review: IReviewReducerState;
  plans: Plan[];
}) => {
  return {
    plans: state.plans,
    plan: state.review.plan,
    seats: state.review.seats,
    minSeats: state.review.minSeats,
    billingFrequency: state.review.billingFrequency,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPlan: (plan: Plan) =>
    dispatch({ type: Actions.Review.Update.Plan, payload: plan }),
  setSeats: (seats: number) =>
    dispatch({ type: Actions.Review.Update.Seats, payload: seats }),
  setBillingFrequency: (billingFrequency: BillingFrequency) =>
    dispatch({
      type: Actions.Review.Update.BillingFrequency,
      payload: billingFrequency,
    }),
});

export default withTranslation('review')(
  connect(mapStateToProps, mapDispatchToProps)(ReviewInputs)
);
