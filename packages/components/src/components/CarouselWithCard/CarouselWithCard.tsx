import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { OutlinedIcon, StyleVariables } from '../../index';
import Card, { CardProps } from './Card';

export interface CarouselWithCardProps {
  cards: Array<CardProps>;
  itemsToDisplay: number;
}

const useStyles = makeStyles(() => ({
  carouselWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  carouselContainer: {
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '25px',
    margin: '0px 50px',
  },
  singleCard: {
    gridTemplateColumns: 'auto',
  },
  carouselButtonPrev: {
    position: 'absolute',
    top: '50%',
    left: '0%',
    border: StyleVariables.colors.base.white,
    background: 'none',
  },
  carouselButtonNext: {
    position: 'absolute',
    top: '50%',
    right: '0%',
    border: StyleVariables.colors.base.white,
    background: 'none',
  },
}));

export default function CarouselWithCard({
  cards,
  itemsToDisplay = 2,
}: CarouselWithCardProps): JSX.Element {
  const classes = useStyles();
  const length = cards.length;
  const [maxItem, setMaxItem] = useState(itemsToDisplay);
  const maxLength = length < maxItem ? length : maxItem;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setMaxItem(1);
      } else {
        setMaxItem(2);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = length - 1;
    }
    if (newIndex >= length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const generateCards = (): JSX.Element[] => {
    const displayCards: JSX.Element[] = [];
    for (let i = activeIndex; i < activeIndex + maxLength; i++) {
      let displayIndex = i;
      if (i >= length) {
        displayIndex = i % length;
      }

      displayCards.push(
        <Card
          image={cards[displayIndex].image}
          title={cards[displayIndex].title}
          description={cards[displayIndex].description}
          name={cards[displayIndex].name}
          designation={cards[displayIndex].designation}
          key={displayIndex}
        />
      );
    }
    return displayCards;
  };
  return (
    <div className={classes.carouselWrap}>
      <button
        className={classes.carouselButtonPrev}
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
        <OutlinedIcon icon={'arrow_back_ios'} />
      </button>
      <button
        className={classes.carouselButtonNext}
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <OutlinedIcon icon={'arrow_forward_ios'} />
      </button>
      <div
        className={`${classes.carouselContainer} ${
          maxItem === 1 ? classes.singleCard : ''
        }`}
      >
        {generateCards()}
      </div>
    </div>
  );
}
