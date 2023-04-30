import {
  Button,
  StyleVariables,
  Text,
  CheckListWithImage,
  ImageCarousel,
  SummaryWithImage,
  NavListWithImage,
  CarouselWithCard,
  NavListWithImageProps,
  CheckListWithImageProps,
  CarouselWithCardProps,
  SummaryWithImageProps,
  ImageCarouselProps,
  OutlinedIcon,
  Modal,
} from '@alcumus/components';
import { Box, Toolbar, AppBar, alpha } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { TFunction } from 'i18next';
import ContactUsModal from '../ContactUsModal';
import RequestDemoModal from '../RequestDemoModal';
import FormSubmitSuccessModal from './FormSubmitSuccessModal';
import { Organization } from '../../types';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { sendDemoRequestForExistingUser } from './sendDemoRequestForExistingUser';
import { UserReducerState } from '../../../client/redux/reducers/user';
import ConfirmSendRequestDemoEmailModal from './ConfirmSendRequestDemoEmailModal';

export interface ProductPageProps {
  withRequestDemo?: boolean;
  withContactUs?: boolean;
  navList?: NavListWithImageProps;
  checkList?: CheckListWithImageProps;
  imageCarousel?: ImageCarouselProps;
  summary?: SummaryWithImageProps;
  cardCarousel?: CarouselWithCardProps;
  imageCarouselTitle?: string;
  cardCarouselTitle?: string;
  checkListTitle?: string;
  backgroundColor?: string;
  t: TFunction;
  isAdmin?: boolean;
  user?: UserReducerState;
  currentOrganization?: Organization;
  productName?: string;
}

const useStyles = makeStyles({
  contactUsButton: { marginright: StyleVariables.spacing(0.75) },
  requestDemoButton: { marginLeft: StyleVariables.spacing(0.75) },
  backIcon: {
    marginRight: StyleVariables.spacing(1),
    color: StyleVariables.colors.text.default,
  },
  back: {
    color: StyleVariables.colors.text.default,
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  row: { marginBottom: StyleVariables.spacing(3) },
  sectionTitleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: StyleVariables.spacing(5),
  },
  sectionTitle: { fontWeight: StyleVariables.fonts.weight.semiBold },
  appBar: {
    top: '73.5px',
    marginTop: '-29px',
    backgroundColor: (props: { backgroundColor?: string }) =>
      alpha(props.backgroundColor || StyleVariables.colors.base.white, 0.9),
    maxHeight: '80px',
    overflow: 'hidden', // Otherwise sidebar items are not clickable in Safari
    borderStyle: 'none',
    backdropFilter: 'blur(10px)',
  },
  toolBar: { width: '100%' },
});

export default function ProductPage({
  withContactUs = false,
  withRequestDemo = false,
  navList,
  checkList,
  summary,
  cardCarousel,
  imageCarousel,
  cardCarouselTitle,
  imageCarouselTitle,
  checkListTitle,
  backgroundColor,
  isAdmin,
  user,
  currentOrganization,
  productName,
  t,
}: ProductPageProps) {
  const [isContactUsModalOpen, setIsContactUsModalOpen] =
    useState<boolean>(false);
  const [isRequestDemoModalOpen, setIsRequestDemoModalOpen] =
    useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const { data: subscriptions } = useSubscriptions(
    currentOrganization?.id,
    true
  );
  const { data: activeSubscriptions } = useSubscriptions(
    currentOrganization?.id,
    false
  );
  const [previousSubscriptionsForOrg, setPreviousSubscriptionsForOrg] =
    useState<boolean>(true);
  const [
    isCurrentProductActiveSubscription,
    setIsCurrentProductActiveSubscription,
  ] = useState<boolean>(false);
  const classes = useStyles({ backgroundColor });
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const history = useHistory();
  function SectionTitle({ title }: { title: string }): JSX.Element {
    return (
      <div className={classes.sectionTitleWrapper}>
        <Text as="h3" className={classes.sectionTitle}>
          {title}
        </Text>
      </div>
    );
  }

  useEffect(() => {
    setPreviousSubscriptionsForOrg(
      (subscriptions && subscriptions.length > 0) || false
    );
    if (activeSubscriptions) {
      setIsCurrentProductActiveSubscription(
        activeSubscriptions.filter(
          (product) => product.application.applicationName === productName
        ).length > 0
      );
    }
  }, [subscriptions, activeSubscriptions]);
  return (
    <React.Fragment>
      <AppBar position="sticky" variant="outlined" className={classes.appBar}>
        <Toolbar disableGutters={true}>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.toolBar}
          >
            <Button
              variant="text"
              rounded
              onClick={() => history.goBack()}
              data-testid="back-button"
            >
              <OutlinedIcon
                icon="keyboard_backspace"
                className={classes.backIcon}
              />
              <Text className={classes.back}>{t('back')}</Text>
            </Button>
            <div>
              {withContactUs && (
                <Button
                  variant="outlined"
                  rounded
                  className={classes.contactUsButton}
                  onClick={() => setIsContactUsModalOpen(true)}
                  data-testid="contactus-button"
                >
                  {t('contactUs')}
                </Button>
              )}
              {isAdmin &&
                !isCurrentProductActiveSubscription &&
                withRequestDemo && (
                  <Button
                    rounded
                    className={classes.requestDemoButton}
                    onClick={async () => {
                      if (previousSubscriptionsForOrg === true) {
                        setShowConfirm(true);
                      } else {
                        setIsRequestDemoModalOpen(true);
                      }
                    }}
                    data-testid="requestdemo-button"
                  >
                    {t('requestDemo')}
                  </Button>
                )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      {summary && (
        <div className={classes.row}>
          <SummaryWithImage {...summary} />
        </div>
      )}
      {imageCarousel && imageCarouselTitle && (
        <div className={classes.row}>
          <SectionTitle title={imageCarouselTitle} />
          <ImageCarousel {...imageCarousel} />
        </div>
      )}
      {navList && (
        <div className={classes.row}>
          <NavListWithImage {...navList} />
        </div>
      )}
      {cardCarousel && cardCarouselTitle && (
        <div className={classes.row}>
          <SectionTitle title={cardCarouselTitle} />
          <CarouselWithCard {...cardCarousel} />
        </div>
      )}
      {checkList && checkListTitle && (
        <div className={classes.row}>
          <SectionTitle title={checkListTitle} />
          <CheckListWithImage {...checkList} />
        </div>
      )}
      <Modal open={isContactUsModalOpen} size="sm">
        <ContactUsModal
          onClose={() => setIsContactUsModalOpen(false)}
          title={t('contactUsModalTitle')}
          onSuccess={() => {
            setIsContactUsModalOpen(false);
            setIsSuccessModalOpen(true);
          }}
        />
      </Modal>

      <Modal open={isRequestDemoModalOpen} size="sm">
        <RequestDemoModal
          title={t('requestDemoModalTitle')}
          onClose={() => setIsRequestDemoModalOpen(false)}
          onSuccess={() => {
            setIsRequestDemoModalOpen(false);
            setIsSuccessModalOpen(true);
          }}
        />
      </Modal>

      <Modal
        open={isSuccessModalOpen}
        size="sm"
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <FormSubmitSuccessModal onClose={() => setIsSuccessModalOpen(false)} />
      </Modal>
      <ConfirmSendRequestDemoEmailModal
        isOpen={showConfirm}
        headerText={t('confirmCancelModalHeader')}
        bodyText={t('confirmCancelModalBody')}
        onCancel={() => setShowConfirm(false)}
        onSubmit={async () => {
          await sendDemoRequestForExistingUser({
            sendersName: `${user?.firstName} ${user?.lastName}`,
            tenantName: currentOrganization?.tenantName,
            productName,
            useremail: user?.email,
          });
          setIsSuccessModalOpen(true);
          setShowConfirm(false);
        }}
        t={t}
      />
    </React.Fragment>
  );
}
