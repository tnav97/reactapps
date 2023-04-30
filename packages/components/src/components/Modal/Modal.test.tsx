import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import Text from '../Text';
import Button from '../Button';

describe('Modal', () => {
  test('it should render', () => {
    render(
      <Modal open title="Hello, World!">
        This is a modal
      </Modal>
    );
    expect(screen.getByText(/Hello, World!/)).toBeInTheDocument();
  });

  test('it should render with custom content', () => {
    render(
      <Modal open>
        <Modal.Header>
          <Text as="h1">Modal with custom header</Text>
          <Text as="small">A description for custom modal goes here</Text>
        </Modal.Header>
        <Modal.Body>
          <Text as="p">Hello, World!</Text>
        </Modal.Body>
        <Modal.Actions>
          <Button>Close custom modal</Button>
        </Modal.Actions>
      </Modal>
    );

    expect(screen.getByText(/Modal with custom header/)).toBeInTheDocument();
    expect(
      screen.getByText(/A description for custom modal goes here/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Hello, World!/)).toBeInTheDocument();
    expect(screen.getByText(/Close custom modal/)).toBeInTheDocument();
  });
});
