import React from 'react';
import { makeStyles } from '@mui/styles';
import NavListItem from './NavListItem/NavListItem';
import { StyleVariables } from '../../index';

export interface NavListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<string>;
  seletedIndex: number;
  onItemSelect: (itemIndex: number) => void;
}

const useStyles = makeStyles({
  listItem: { marginBottom: StyleVariables.spacing(2), left: 0 },
});

export default function CarouselNavList({
  items,
  seletedIndex,
  onItemSelect,
  ...rest
}: NavListProps) {
  const classes = useStyles();

  return (
    <div {...rest}>
      {items.map((item, index) => (
        <div key={item}>
          <NavListItem
            label={item}
            isSelected={index === seletedIndex}
            className={classes.listItem}
            onClick={() => onItemSelect(index)}
            data-testid={item}
          />
        </div>
      ))}
    </div>
  );
}
