import React from 'react';
import { Button, Grid, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Image, StyleVariables, Text } from '@alcumus/components';
import clsx from 'clsx';

interface HomePageAddServiceFormProps {
  imageUrl: string;
  title: string;
  content: string;
  color: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDetail: {
    backgroundColor: StyleVariables.colors.surface.default,
  },
  title: {
    padding: theme.spacing(1),
    color: StyleVariables.colors.text.secondary,
    marginTop: '-10px',
  },
  image: {
    width: '100%',
  },
  content: {
    padding: '1rem 1rem 0',
    display: 'block',
  },
  points: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    padding: `0 1rem`,
    '& li::marker': {
      color: StyleVariables.colors.action.primary.default,
      fontSize: StyleVariables.fonts.size.regular,
    },
  },
  addServiceForm: {
    backgroundColor: StyleVariables.colors.grey,
    height: '100%',
    padding: '1rem 3rem',
  },
  addServiceFormTitle: {
    color: StyleVariables.colors.action.primary.default,
    textTransform: 'uppercase',
    fontSize: StyleVariables.fonts.size.h3,
    fontWeight: StyleVariables.fonts.weight.bold,
    lineHeight: '3rem',
  },
  action: {
    textAlign: 'right',
  },
  actionButton: {
    textTransform: 'uppercase',
    backgroundColor: StyleVariables.colors.action.primary.default,
    color: StyleVariables.colors.white,
    '&:hover': {
      color: StyleVariables.colors.action.primary.hover,
    },
  },
  textField: {
    backgroundColor: StyleVariables.colors.surface.default,
    margin: '0.5rem 0',
  },
  noImage: {
    marginTop: 0,
  },
}));

export default function HomePageAddServiceForm({
  imageUrl,
  title,
  color,
  content,
}: HomePageAddServiceFormProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.serviceDetail}>
            {!!imageUrl && (
              <Image src={imageUrl} alt={title} className={classes.image} />
            )}
            <Text
              as="h6"
              className={clsx(classes.title, {
                [classes.noImage]: !imageUrl?.length,
              })}
              style={{ backgroundColor: color }}
            >
              {title}
            </Text>
            <Text as="small" variant="subtitle2" className={classes.content}>
              {content}
            </Text>
            <div className={classes.points}>
              <ul>
                <li>Bullet Point 1</li>
                <li>Bullet Point 2</li>
                <li>Bullet Point 3</li>
              </ul>
              <ul>
                <li>Bullet Point 4</li>
                <li>Bullet Point 5</li>
                <li>Bullet Point 6</li>
              </ul>
              <ul>
                <li>Bullet Point 7</li>
                <li>Bullet Point 8</li>
                <li>Bullet Point 9</li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.addServiceForm}>
            <Text as="h5" className={classes.addServiceFormTitle}>
              Get in touch to
              <br />
              add this service
            </Text>
            <br />
            <br />
            <TextField
              data-testid="nameInput"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              className={classes.textField}
            />
            <br />
            <TextField
              data-testid="emailInput"
              label="Email Address"
              variant="outlined"
              size="small"
              fullWidth
              className={classes.textField}
            />
            <br />
            <TextField
              data-testid="messageInput"
              label="Message"
              rows={4}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              className={classes.textField}
            />
            <br />
            <div className={classes.action}>
              <Button
                variant="contained"
                className={classes.actionButton}
                size="small"
              >
                Send Inquiry
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
