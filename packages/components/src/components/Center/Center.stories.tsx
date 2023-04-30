import React from 'react';

import Center from './Center';

export default {
  title: 'Utility Components/Center',
  component: Center,
};

export const withTextContent = () => (
  <Center>This is a Plain Text Content Example</Center>
);

export const withJSXContent = () => (
  <Center>
    <h1>JSX Markup Example</h1>
    <br />
    <br />
    <p>This is a paragraph text</p>
  </Center>
);

export const withJSXContentInColumnDirection = () => (
  <Center direction="column">
    <h1>JSX Markup Example</h1>
    <br />
    <br />
    <p>This is a paragraph text</p>
  </Center>
);
