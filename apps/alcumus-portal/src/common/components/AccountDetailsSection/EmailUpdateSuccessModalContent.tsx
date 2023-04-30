import React from 'react';
import { Text, Modal } from '@alcumus/components';

export default function EmailUpdateSuccessModalContent() {
  return (
    <Modal.Body>
      <Text as="p">
        The email you log in with your account has been updated in our system.
      </Text>
      <Text as="strong">
        You will now be logged out, and will need to log in again with your new
        email.
      </Text>
    </Modal.Body>
  );
}
