import React, { FunctionComponent } from 'react';
import {
  CircularProgress,
  Grid,
  Modal,
  Paper,
  Fade,
  Backdrop,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import CloseIcon from '@mui/icons-material/Close';
import { CancelButton } from '../Button/CancelButton';
import { PrimaryButton } from '../Button/PrimaryButton';
import { CriticalButton } from '../Button/CriticalButton';

interface CustomModalProps {
  id?: string;
  headerText: string;
  primaryButtonText: string;
  danger?: boolean;
  cancelButtonText?: string;
  disablePrimaryButton?: boolean;
  isValidating?: boolean;
  onHide?: () => void;
  onPrimaryAction?: (e) => void;
  closeIcon?: JSX.Element;
  modalBody?: JSX.Element;
  modalFooter?: JSX.Element;
  open: boolean;
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    overflow: 'scroll',
  },
  modalHeaderText: {
    fontWeight: StyleVariables.fonts.weight.medium,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  modalCloseButton: {
    float: 'right',
    color: StyleVariables.colors.grey4,
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  modalHeader: {
    backgroundColor: StyleVariables.colors.grey2,
    borderRadius: '8px 8px 0 0',
    justifyContent: 'space-between',
    padding: '16px 24px',
  },
  modalBody: {
    margin: '24px 24px 54px 24px',
    width: 540,
  },
  modalCancelButton: {
    marginRight: 9,
  },
  paper: {
    width: 640,
    borderRadius: 8,
    maxHeight: 640,
  },
  modalFooter: {
    padding: 16,
    borderTop: `1px solid ${StyleVariables.colors.grey2}`,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const CustomModal: FunctionComponent<CustomModalProps> = ({
  id,
  headerText,
  onHide,
  closeIcon,
  modalBody,
  primaryButtonText,
  danger,
  onPrimaryAction,
  modalFooter,
  disablePrimaryButton,
  isValidating,
  open,
}: CustomModalProps) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby={id}
      open={open}
      onClose={onHide}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
      data-testid={id}
    >
      <Fade in={open}>
        <Paper elevation={0} className={classes.paper}>
          <Grid item container direction="column">
            <Grid
              item
              container
              direction="row"
              className={classes.modalHeader}
            >
              <Text as="h5" className={classes.modalHeaderText}>
                {headerText}
              </Text>
              {closeIcon ?? (
                <CloseIcon
                  onClick={onHide}
                  className={classes.modalCloseButton}
                />
              )}
            </Grid>
            <Grid
              item
              container
              direction="column"
              className={classes.modalBody}
            >
              {modalBody &&
                (isValidating ? (
                  <CircularProgress style={{ alignSelf: 'center' }} />
                ) : (
                  modalBody
                ))}
            </Grid>
            {modalFooter ?? (
              <Grid
                item
                container
                direction="row"
                className={classes.modalFooter}
              >
                <CancelButton
                  onClick={onHide}
                  className={classes.modalCancelButton}
                />
                {danger ? (
                  <CriticalButton
                    onClick={onPrimaryAction}
                    text={primaryButtonText}
                    ariaLabel={primaryButtonText}
                    disabled={disablePrimaryButton || isValidating}
                  />
                ) : (
                  <PrimaryButton
                    onClick={onPrimaryAction}
                    text={primaryButtonText}
                    ariaLabel={primaryButtonText}
                    disabled={disablePrimaryButton || isValidating}
                    id="submitButton"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
