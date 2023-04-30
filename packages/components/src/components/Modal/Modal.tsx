import React from 'react';
import MuiModal from '@mui/material/Modal';
import clsx from 'clsx';
import { IconButton, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Text from '../Text';
import styleVariables from '../../styles/variables';
import { RegularIcon } from '../Icon';

const useStyles = makeStyles((theme: Theme) => ({
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBody: {
    margin: '1rem 0',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '1rem',
    '& > *:not(:first-child)': {
      marginLeft: '1rem',
    },
  },
  modalContent: {
    backgroundColor: styleVariables.colors.surface.default,
    borderRadius: '8px',
    padding: '24px',
    position: 'absolute',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modalTitle: {
    fontSize: styleVariables.fonts.size.h4,
    fontFamily: styleVariables.fonts.family.heading,
    color: styleVariables.colors.text.default,
    [theme.breakpoints.only('sm')]: {
      fontSize: styleVariables.fonts.size.h3,
    },
  },
  closeButton: {
    cursor: 'pointer',
  },
  sm: {
    width: styleVariables.breakpoints.sm,
    maxWidth: '95%',
  },
  md: {
    width: styleVariables.breakpoints.md,
    maxWidth: '95%',
  },
  lg: {
    width: styleVariables.breakpoints.lg,
    maxWidth: '95%',
  },
  xl: {
    width: styleVariables.breakpoints.xl,
    maxWidth: '95%',
  },
}));

function ModalHeader({
  showCloseButton = true,
  onClose,
  children,
  className,
}: {
  children: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
}) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.modalHeader, className)}>
      {showCloseButton ? (
        <React.Fragment>
          <div>{children}</div>
          <IconButton size="small" onClick={onClose}>
            <RegularIcon icon="close" />
          </IconButton>
        </React.Fragment>
      ) : (
        children
      )}
    </div>
  );
}

function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classes = useStyles();
  return <div className={clsx(classes.modalBody, className)}>{children}</div>;
}

function ModalActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.modalActions, className)}>{children}</div>
  );
}

export interface ModalProps {
  allowAutoClose?: boolean;
  open?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
  classes?: ModalClasses;
  dataTestId?: string;
  [x: string]: any;
}

export interface ModalClasses {
  modalActions?: string;
  modalBody?: string;
  modalHeader?: string;
}

function Modal({
  allowAutoClose = false,
  open = false,
  title = undefined,
  size = 'md',
  className = undefined,
  dismissible = true,
  onClose,
  children,
  classes: modalClasses,
  dataTestId,
  ...rest
}: ModalProps) {
  const classes = useStyles();

  return (
    <MuiModal
      open={open}
      onClose={allowAutoClose ? onClose : undefined}
      {...rest}
    >
      <div className={clsx(classes[size], classes.modalContent, className)}>
        {!!title?.length && (
          <ModalHeader
            showCloseButton={dismissible}
            onClose={onClose}
            className={modalClasses?.modalHeader}
          >
            <Text
              as="h4"
              className={classes.modalTitle}
              data-testid={dataTestId}
            >
              {title}
            </Text>
          </ModalHeader>
        )}
        {children}
      </div>
    </MuiModal>
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;

export default Modal;
