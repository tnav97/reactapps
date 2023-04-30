import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Product from './Product';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Product', () => {
  test(`It should render product`, () => {
    render(
      <Product
        key={1}
        productId={1}
        title={'TITLE'}
        url={'URL'}
        content={'DESCRIPTION'}
        categories={[
          {
            applicationCategoryName: 'CATEGORY',
            applicationCategoryLookupKey: 'category',
            applicationCategoryId: 1,
          },
        ]}
        isActive={true}
      />
    );
    //expect(screen.getByText(product.description)).toBeInTheDocument(); //removed since we don't have the correct language yet!
    expect(screen.getByText(/TITLE/)).toBeInTheDocument();
  });
});
