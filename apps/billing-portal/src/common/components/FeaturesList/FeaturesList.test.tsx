import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import FeaturesList from './FeaturesList';

describe('FeaturesList Component tests', () => {
  const featureItem1Text = 'Feature 1';
  const featureItem2Text = 'Feature 2';

  test('it renders', () => {
    render(
      <FeaturesList featureItems={[featureItem1Text, featureItem2Text]} />
    );
    expect(screen.getByText(featureItem1Text)).toBeInTheDocument();
    expect(screen.getByText(featureItem2Text)).toBeInTheDocument();
  });
});
