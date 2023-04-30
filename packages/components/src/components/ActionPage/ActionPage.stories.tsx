import React from 'react';
import { Story } from '@storybook/react';
import ActionPage, { ActionPageProps } from './ActionPage';
import Text from '../Text';
import Button from '../Button';

export default {
  component: ActionPage,
  title: 'Utility Components/ActionPage',
};

const TemplateSingle: Story<ActionPageProps> = (args) => (
  <ActionPage {...args}></ActionPage>
);

const Template: Story<ActionPageProps> = (args) => <ActionPage {...args} />;

export const singleButton = TemplateSingle.bind({});
singleButton.args = {
  header: 'Page header',
  body: 'Main message to customer',
  imgSrc:
    'https://coredevuksstorage01.z33.web.core.windows.net/bench_with_safety_cap.svg',
  imgAlt: 'trial ended',
  buttons: (
    <Button
      rounded
      size={'large'}
      variant="contained"
      onClick={() => null}
      data-testid="cta-btn"
    >
      <Text center as="h5">
        {'Button'}
      </Text>
    </Button>
  ),
};

export const noButtons = Template.bind({});
noButtons.args = {
  header: 'Page header',
  body: 'Main message to customer',
  imgSrc:
    'https://coredevuksstorage01.z33.web.core.windows.net/bench_with_safety_cap.svg',
  imgAlt: 'trial ended',
};
