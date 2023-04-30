import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionPage, { ActionPageProps } from './ActionPage';

describe('ActionPage component', () => {
  test('it should render header', () => {
    const props: ActionPageProps = {
      header: ' ',
    };

    render(<ActionPage {...props} />);

    expect(screen.getByTestId(/header/)).toBeInTheDocument();
  });

  test('it should render body', () => {
    const props: ActionPageProps = {
      body: ' ',
    };

    render(<ActionPage {...props} />);

    expect(screen.getByTestId(/body/)).toBeInTheDocument();
  });

  test('it should render image', () => {
    const imgSrc = 'image';
    const imgAlt = 'imageAlt';
    const props: ActionPageProps = {
      imgSrc,
      imgAlt,
    };

    render(<ActionPage {...props} />);
    const imageElement: HTMLElement = screen.getByTestId(/img/);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', imgSrc);
    expect(imageElement).toHaveAttribute('alt', imgAlt);
  });

  test('it should render children', () => {
    const dataTestId = 'test id';
    const props: ActionPageProps = {
      buttons: (
        <button type="button" data-testid={dataTestId}>
          Button
        </button>
      ),
    };

    render(<ActionPage {...props} />);

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});
