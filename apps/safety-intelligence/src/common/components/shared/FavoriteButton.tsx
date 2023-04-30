import { StyleVariables } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React, { FunctionComponent, useState } from 'react';
import Analytics from '@alcumus/analytics-package';

const useStyles = makeStyles({
  icon: {
    '& .fas': {
      color: StyleVariables.colors.action.primary.default,
    },
    '& .far': {
      color: StyleVariables.colors.grey4,
    },
  },
});
interface Props {
  liked: boolean;
  onFavourite?: (liked: boolean) => void;
}
const FavoriteButton: FunctionComponent<Props> = ({
  liked,
  onFavourite,
}: Props) => {
  const classes = useStyles();
  const [isFavourite, setFavourite] = useState(liked ?? false);
  const shouldFavouriteItem = (wasFavourited: boolean) => {
    setFavourite(!wasFavourited);
    if (onFavourite) onFavourite(!wasFavourited);
    Analytics.getInstance().trackWithCategory(
      'Favourites',
      `${wasFavourited ? 'Un-favourited' : 'Favourited'} an item`
    );
  };

  const getCurrentIcon = () => {
    return isFavourite ? 'fas fa-heart' : 'far fa-heart';
  };

  return (
    <span
      className={classes.icon}
      onClick={() => shouldFavouriteItem(isFavourite)}
    >
      <i className={getCurrentIcon()} />
    </span>
  );
};

export default FavoriteButton;
