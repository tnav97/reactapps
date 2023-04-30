import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ReviewSummary from './ReviewSummary';
import { IReviewReducerState } from '../../../../client/redux/reducers/reviewReducer';
import { Price } from '../../../../types/plans';

const mapStateToProps = ({ review }: { review: IReviewReducerState }) => {
  return {
    plan: review.plan,
    seats: review.seats,
    billingFrequency: review.billingFrequency,
    price: review.plan.prices.find(
      (price) => price.billingFrequency === review.billingFrequency
    ) as Price,
  };
};

export default withTranslation('review')(
  connect(mapStateToProps)(ReviewSummary)
);
