import React, { useState, useCallback } from 'react';
import Modal, { ModalProps } from './Modal';
import { Story } from '@storybook/react';
import Button from '../Button';
import Text from '../Text';

export default {
  component: Modal,
  title: 'Components/Modal',
};

const Template: Story<ModalProps> = (args) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <React.Fragment>
      <Modal {...args} open={showModal} onClose={handleCloseModal}>
        <Modal.Body>This is a modal</Modal.Body>
        <Modal.Actions>
          <Button onClick={handleCloseModal}>Close Modal</Button>
        </Modal.Actions>
      </Modal>
      <Button onClick={handleOpenModal}>Open Modal</Button>
    </React.Fragment>
  );
};

export const SmallModal = Template.bind({});
SmallModal.args = {
  title: 'Small modal',
  size: 'sm',
};

export const MediumModal = Template.bind({});
MediumModal.args = {
  title: 'Medium modal',
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  title: 'Large modal',
  size: 'lg',
};

export const ExtraLargeModal = Template.bind({});
ExtraLargeModal.args = {
  title: 'Extra large modal',
  size: 'xl',
};

const CustomModalTemplate: Story<ModalProps> = (args) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <React.Fragment>
      <Modal {...args} open={showModal}>
        <Modal.Header showCloseButton onClose={handleCloseModal}>
          <Text as="h1">Modal with custom header</Text>
          <Text as="small">A description for custom modal goes here</Text>
        </Modal.Header>
        <Modal.Body>
          <Text as="p">Hello, World!</Text>
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={handleCloseModal}>Close custom modal</Button>
        </Modal.Actions>
      </Modal>
      <Button onClick={handleOpenModal}>Open Modal</Button>
    </React.Fragment>
  );
};

export const ModalWithCustomHeader = CustomModalTemplate.bind({});
ModalWithCustomHeader.args = {
  size: 'lg',
};
