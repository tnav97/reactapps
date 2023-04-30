import ReviewPage from './ReviewPage';
import { connect } from 'react-redux';
import { IReviewReducerState } from '../../../client/redux/reducers/reviewReducer';
import { withTranslation } from 'react-i18next';
import { Plan, Price } from '../../../types/plans';

const mapStateToProps = (state: {
  review: IReviewReducerState;
  plans: Plan[];
}) => {
  return {
    plan: state.review.plan,
    price: state.review.plan.prices.find(
      (price) => price.billingFrequency === state.review.billingFrequency
    ) as Price,
    seats: state.review.seats,
    minSeats: state.review.minSeats,
    billingFrequency: state.review.billingFrequency,
    accountHolderName: state.review.accountHolderName,
    accountHolderEmail: state.review.accountHolderEmail,
  };
};

export default withTranslation('review')(connect(mapStateToProps)(ReviewPage));
