import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, createStyles } from '@mui/styles';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { FolderOutlined } from '@mui/icons-material';
import { Text, StyleVariables } from '@alcumus/components';
interface Props {
  data: {
    name: string;
    dashboards: number | string | null;
    looks: number | string | null;
    basePath: string;
  };
  headers?: Array<string>;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 226,
      height: theme.spacing(10),
      borderRadius: theme.spacing(1),
    },
    pos: {
      color: StyleVariables.colors.grey4,
      lineHeight: '18px',
      wrap: 'nowrap',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      justifyContent: 'center',
    },
    cardContent: {
      padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(1)}px`,
      flexWrap: 'nowrap',
    },
    verticallyCenter: {
      lineHeight: '50px',
    },
  })
);

const FolderTile: FunctionComponent<Props> = ({ data, headers }: Props) => {
  const classes = useStyles();
  const includeDashboard = headers?.includes('Dashboards');
  const includeLooks = headers?.includes('Looks');
  return (
    <NavLink to={`${data.basePath}`}>
      <Card className={classes.root} variant="outlined">
        <Grid container className={classes.container} wrap="nowrap">
          <Grid item xs={2}>
            <Box
              m={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <CardContent>
                <FolderOutlined
                  style={{ color: StyleVariables.colors.grey4 }}
                />
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <CardContent className={classes.cardContent}>
              <Text
                noWrap
                className={
                  !(!!includeDashboard && !!includeLooks)
                    ? classes.verticallyCenter
                    : undefined
                }
              >
                {data.name}
              </Text>
              {!!includeDashboard && !!includeLooks && (
                <Text as="span" className={classes.pos} noWrap>
                  {data.dashboards || 0} Dashboards, {data.looks || 0} Looks
                </Text>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </NavLink>
  );
};

export default FolderTile;
