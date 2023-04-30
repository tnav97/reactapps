import React, { FunctionComponent } from 'react';
import { Image } from '@alcumus/components';

type Props = {
  score: number;
};

const numericScoreToImageMap = {
  0: '/images/popularity/zerobar.svg',
  1: '/images/popularity/onebar.svg',
  2: '/images/popularity/twobar.svg',
  3: '/images/popularity/threebar.svg',
  4: '/images/popularity/fourbar.svg',
  5: '/images/popularity/fivebar.svg',
};

const PopularityScore: FunctionComponent<Props> = ({ score }: Props) => {
  let scoreImage;
  switch (true) {
    case score === 100:
      scoreImage = 5;
      break;
    case score >= 80:
      scoreImage = 4;
      break;
    case score >= 60:
      scoreImage = 3;
      break;
    case score >= 40:
      scoreImage = 2;
      break;
    case score >= 20:
      scoreImage = 1;
      break;
    default:
      scoreImage = 0;
      break;
  }

  return (
    <Image src={numericScoreToImageMap[scoreImage]} alt={`${scoreImage}/5`} />
  );
};

export default PopularityScore;
