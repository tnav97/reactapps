import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import FavoriteContentButton from '../shared/FavoriteContentButton';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { getContentThumbnail } from '../../../server/models/content';
import { StyleVariables, Text } from '@alcumus/components';

interface Props {
  data: {
    id: number;
    elementType: ReportElementTypes | undefined;
    name: string;
    views: number | string | undefined;
    favourites: number | undefined;
    createdBy: string;
    basePath: string;
    liked: boolean;
    contentMetadataId: number;
    contentFavoriteId: number | undefined;
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: theme.spacing(28),
      height: theme.spacing(20),
    },
    content: {
      padding: 0,
    },
    media: {
      height: 90,
    },
    titleContainer: {
      padding: '8px 16px 0 16px',
    },
    customNavlink: {
      color: StyleVariables.colors.text.default,
      textDecoration: 'underline',
      '&:hover': {
        color: StyleVariables.colors.action.primary.default,
      },
    },
    container: {
      padding: '0 16px',
      color: StyleVariables.colors.grey4,
    },
    tileDetail: {
      fontSize: '0.5rem',
    },
  })
);

const Tile: FunctionComponent<Props> = ({ data }: Props) => {
  const classes = useStyles();
  const [thumbnail, setThumbnail] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    getContentThumbnail(data.id, data.elementType).then((res) => {
      if (isMounted.current) {
        setThumbnail(res);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, [data]);

  const getThumbnail = () => {
    return thumbnail !== ''
      ? `data:image/svg+xml;base64,${btoa(thumbnail)}`
      : '/images/report_placeholder.png';
  };

  const getViewCount = () => {
    return data.views && <span>{data.views} Views,</span>;
  };

  const getFavoriteCount = () => {
    return data.favourites !== 0 && <span>{data.favourites} Favorites,</span>;
  };

  const getCreatedBy = () => {
    return <span>Created By {data.createdBy}</span>;
  };

  return (
    <Card className={classes.root} variant="outlined" data-testid="reportTile">
      <NavLink to={data.basePath} className={classes.customNavlink}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={getThumbnail()}
            title="thumbnail"
          />
          <CardContent className={classes.titleContainer}>
            <Text as="span" noWrap>
              {data.name}
            </Text>
          </CardContent>
        </CardActionArea>
      </NavLink>
      <Grid
        container
        wrap="nowrap"
        direction="row"
        className={classes.container}
      >
        <Grid item xs zeroMinWidth>
          <CardContent className={classes.content}>
            <Text as="small" noWrap className={classes.tileDetail}>
              {getViewCount()} {getFavoriteCount()} {getCreatedBy()}
            </Text>
          </CardContent>
        </Grid>
        <Grid item>
          <FavoriteContentButton
            elementType={data.elementType}
            liked={data.liked}
            contentMetadataId={data.contentMetadataId}
            contentFavoriteId={data.contentFavoriteId}
            handleOnDeleteFavorite={() => null}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Tile;
