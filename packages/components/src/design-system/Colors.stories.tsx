import React from 'react';
import Grid from '@mui/material/Grid';
import StyleVariables from '../styles/variables';
import Text from '../components/Text';
import Center from '../components/Center';

interface ColorComponentProps {
  colorCode: string;
  colorName: string;
}

const ColorComponent = ({ colorCode, colorName }: ColorComponentProps) => (
  <Grid item sm={4} md={2} key={colorName} style={{ padding: '1rem' }}>
    <Center direction="column">
      <div
        style={{
          backgroundColor: colorCode,
          height: '50px',
          width: '100%',
        }}
      />
      <Text>
        {colorName} <Text as="small">({colorCode})</Text>
      </Text>
    </Center>
  </Grid>
);

const ColorGuide = ({
  colors,
  prefix = '',
}: {
  colors: any;
  prefix?: string;
}) => {
  return (
    <Grid container>
      {Object.keys(colors).map((colorName) => {
        return typeof colors[colorName] === 'string' ? (
          <ColorComponent
            colorCode={colors[colorName]}
            colorName={`${prefix}.${colorName}`}
          />
        ) : (
          <ColorGuide
            colors={colors[colorName]}
            prefix={`${prefix}.${colorName}`}
          />
        );
      })}
    </Grid>
  );
};

export default {
  title: 'Style Guide/Colors',
  component: ColorGuide,
};

export const ColorVariables = () => (
  <React.Fragment>
    <ColorGuide colors={StyleVariables.colors} />
  </React.Fragment>
);
