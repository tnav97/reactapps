import { render, screen } from '@testing-library/react';
import React from 'react';
import QuestionnaireTile from './QuestionnaireTile';

describe('QuestionnaireTile.tsx', () => {
  it('should render', () => {
    render(
      <QuestionnaireTile
        title="Step title"
        illustration="test.png"
        onClick={() => {}}
      />
    );

    expect(screen.getByText('Step title')).toBeInTheDocument();
    expect(screen.getByTestId('illustration')).toBeInTheDocument();
    expect(screen.getByTestId('illustration')).toHaveAttribute(
      'src',
      'test.png'
    );
  });
});
