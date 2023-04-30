import React, { FunctionComponent } from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import FavoriteButton from './FavoriteButton';
import {
  createContentFavorite,
  deleteContentFavorite,
} from '../../../server/models/content';
import { ContentFavoriteDto } from '../../../dtos/ContentFavoriteDto';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { useRecoilState } from 'recoil';
import { showToastState } from '../Toast/Toast';

type Props = {
  elementType?: ReportElementTypes;
  contentMetadataId: number;
  contentFavoriteId?: number | undefined;
  liked: boolean;
  handleOnDeleteFavorite: (contentFavoriteId?: number) => void;
  t: TFunction;
};

const FavoriteContentButton: FunctionComponent<Props> = ({
  elementType,
  contentMetadataId,
  liked,
  handleOnDeleteFavorite,
  contentFavoriteId,
  t,
}: Props) => {
  const [toastProps, setToastProps] = useRecoilState(showToastState);

  const addMessage = `${elementType?.charAt(0).toUpperCase()}${elementType
    ?.slice(1)
    .toLowerCase()} ${t('favoriteAdd', { ns: 'ModalWindow' })}`;
  const removeMessage = `${elementType?.charAt(0).toUpperCase()}${elementType
    ?.slice(1)
    .toLowerCase()} ${t('favoriteRemove', { ns: 'ModalWindow' })}`;
  const errorMessage = `${t('favoriteError', {
    ns: 'ModalWindow',
  })} ${elementType}. ${t('pleaseTryAgain', { ns: 'ModalWindow' })}`;
  const handleFavouriteContent = async (liked: boolean) => {
    if (liked) {
      createContentFavorite({
        contentMetadataId: contentMetadataId,
      })
        .then((res: ContentFavoriteDto | undefined) => {
          contentFavoriteId = res?.id;
          setToastProps({
            ...toastProps,
            showToast: true,
            severity: 'success',
            message: addMessage,
          });
          return true;
        })
        .catch(() => {
          setToastProps({
            ...toastProps,
            showToast: true,
            severity: 'error',
            message: errorMessage,
          });
          return false;
        });
    }
    if (!liked && contentFavoriteId) {
      deleteContentFavorite(contentFavoriteId).then(() =>
        handleOnDeleteFavorite(contentFavoriteId)
      );
      setToastProps({
        ...toastProps,
        showToast: true,
        severity: 'success',
        message: removeMessage,
      });
    }
  };

  return (
    <FavoriteButton
      liked={liked}
      onFavourite={handleFavouriteContent}
      aria-label={t('favorites', { ns: 'AriaLabels' })}
    />
  );
};

export default withTranslation(['ModalWindow', 'AriaLabels'])(
  FavoriteContentButton
);
