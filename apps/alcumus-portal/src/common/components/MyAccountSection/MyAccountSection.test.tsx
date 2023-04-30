import '@testing-library/jest-dom';
import React from 'react';
import MyAccountSection, { myAccountDataTestIds } from './MyAccountSection';
import { render, screen, fireEvent } from '@testing-library/react';

describe('components/MyAccountSection', () => {
  test('it renders', () => {
    render(
      <MyAccountSection header="Header" t={(x) => x}>
        <></>
      </MyAccountSection>
    );

    expect(
      screen.getByTestId(myAccountDataTestIds.container)
    ).toBeInTheDocument();
    expect(screen.getByTestId(myAccountDataTestIds.header)).toBeInTheDocument();
    expect(() => screen.getByTestId(myAccountDataTestIds.subHeader)).toThrow();
    expect(() => screen.getByTestId(myAccountDataTestIds.editButton)).toThrow();
  });

  test('it renders subheader', () => {
    render(
      <MyAccountSection header="Header" subHeader="subheader" t={(x) => x}>
        <></>
      </MyAccountSection>
    );

    expect(
      screen.getByTestId(myAccountDataTestIds.container)
    ).toBeInTheDocument();
    expect(screen.getByTestId(myAccountDataTestIds.header)).toBeInTheDocument();
    expect(
      screen.getByTestId(myAccountDataTestIds.subHeader)
    ).toBeInTheDocument();
    expect(() => screen.getByTestId(myAccountDataTestIds.editButton)).toThrow();
  });

  test('it renders edit button', () => {
    render(
      <MyAccountSection
        header="Header"
        subHeader="subheader"
        t={(x) => x}
        editable
      >
        <></>
      </MyAccountSection>
    );

    expect(
      screen.getByTestId(myAccountDataTestIds.container)
    ).toBeInTheDocument();
    expect(screen.getByTestId(myAccountDataTestIds.header)).toBeInTheDocument();
    expect(
      screen.getByTestId(myAccountDataTestIds.subHeader)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(myAccountDataTestIds.editButton)
    ).toBeInTheDocument();
  });

  test('it renders children', () => {
    render(
      <MyAccountSection
        header="Header"
        subHeader="subheader"
        t={(x) => x}
        editable
      >
        <p data-testid="children">something</p>
      </MyAccountSection>
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  test('it calls onEdit', () => {
    const mockedOnEdit = jest.fn();
    render(
      <MyAccountSection
        header="Header"
        subHeader="subheader"
        t={(x) => x}
        editable
        onEdit={mockedOnEdit}
      >
        <p data-testid="children">something</p>
      </MyAccountSection>
    );

    const editButton = screen.getByTestId(myAccountDataTestIds.editButton);
    fireEvent.click(editButton);
    expect(mockedOnEdit).toHaveBeenCalledTimes(1);
  });
});
