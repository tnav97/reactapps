import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Text, StyleVariables } from '@alcumus/components';
import Service from './Service';

const useStyles = makeStyles(() => ({
  servicesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.xs,
    maxWidth: '650px',
    margin: '1rem 0',
  },
  services: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default function HomePageServices() {
  const classes = useStyles();

  return (
    <div className={classes.servicesContainer}>
      <Grid container>
        <Grid item md={7}>
          <Text as="h3" uppercase bold color="primary">
            End-to-end Risk Management Services
          </Text>
          <Text as="p" variant="body2" className={classes.info}>
            Alcumus is a leading provider of software-led Risk Management
            solutions which help organizations become Safer, Healthier and
            Stronger. <br />
            To enquire about adding additional services, simply click the add
            button below and we&rsquo;ll be in touch.
          </Text>
        </Grid>
        <Grid item md={5}>
          <div className={classes.services}>
            <Service
              imageUrl="/images/browse-services.svg"
              imageDescription="Browse services"
              id="serviceDescription1"
              descriptionLine1="Browse our range"
              descriptionLine2="of services"
            />
            <Service
              imageUrl="/images/add-service.png"
              imageDescription="Add service"
              id="serviceDescription2"
              descriptionLine1="Click ADD to"
              descriptionLine2="enquire"
            />
            <Service
              imageUrl="/images/enquire-services.svg"
              imageDescription="Enquire services"
              id="serviceDescription3"
              descriptionLine1="We'll be in touch to"
              descriptionLine2="get the App added"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
