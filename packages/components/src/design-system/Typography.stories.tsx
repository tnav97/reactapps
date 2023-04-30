import React from 'react';
import { Story } from '@storybook/react';
import StyleVariables from '../styles/variables';
import Text, { TextProps, TextVariant } from '../components/Text';

interface TypographyProps {
  as?: TextVariant;
  bold?: boolean;
  variant?: string;
  children: React.ReactNode;
  [x: string]: any;
}

const Typography = ({ as: HtmlTag, children, ...rest }: TypographyProps) => (
  <Text as={HtmlTag} {...rest}>
    {children}
  </Text>
);

export default {
  title: 'Style Guide/Typography',
  component: Typography,
  argTypes: {
    uppercase: {
      control: { type: 'boolean' },
    },
    center: {
      control: { type: 'boolean' },
    },
  },
};

export const Weight = () => (
  <>
    <Typography
      as="h1"
      style={{ fontWeight: StyleVariables.fonts.weight.regular }}
    >
      Aa
    </Typography>
    <Typography variant="body1">Regular</Typography>
    <br />
    <br />
    <Typography
      as="h1"
      style={{ fontWeight: StyleVariables.fonts.weight.medium }}
    >
      Aa
    </Typography>
    <Typography variant="body1">Medium</Typography>
    <br />
    <br />
    <Typography
      as="h1"
      style={{ fontWeight: StyleVariables.fonts.weight.bold }}
    >
      Aa
    </Typography>
    <Typography variant="body1">Bold</Typography>
  </>
);

const HeadingsTemplate: Story<TextProps> = (args) => (
  <>
    <Typography as="h1" {...args}>
      Heading 1
    </Typography>
    <br />
    <br />
    <Typography as="h2" {...args}>
      Heading 2
    </Typography>
    <br />
    <br />
    <Typography as="h3" {...args}>
      Heading 3
    </Typography>
    <br />
    <br />
    <Typography as="h4" {...args}>
      Heading 4
    </Typography>
    <br />
    <br />
    <Typography as="h5" {...args}>
      Heading 5
    </Typography>
    <br />
    <br />
    <Typography as="h6" {...args}>
      Heading 6
    </Typography>
  </>
);
export const Headings = HeadingsTemplate.bind({});
Headings.args = { uppercase: false, center: false };

const BodyTextTemplate: Story<TextProps> = (args) => (
  <>
    <Typography as="p" {...args}>
      Paragraph 1
    </Typography>
    <br />
    <br />
    <Typography variant="body2" {...args}>
      Paragraph 2
    </Typography>
    <br />
    <br />
    <Typography variant="subtitle1" {...args}>
      Description
    </Typography>
    <br />
    <br />
    <Typography variant="subtitle2" {...args}>
      Caption
    </Typography>
    <br />
    <br />
    <Typography variant="subtitle1" uppercase bold center={args.center}>
      Subtitle (All Caps)
    </Typography>
  </>
);
export const BodyStyles = BodyTextTemplate.bind({});
BodyStyles.args = { uppercase: false, center: false };
