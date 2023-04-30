import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { atom, useRecoilState } from 'recoil/dist';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import RedirectTo from '../../../utilities/RedirectTo';
import SaveInFolderModal, { SaveInFolderModalProps } from './SaveInFolderModal';
import { LookDto } from '../../../dtos/lookDto';
import { createLook } from '../../../server/models/look';
import { verifyLookNameUniqueIn } from '../../../server/models/folder';
import { StyleVariables, Text } from '@alcumus/components';
import SingleSelectDropdown from '../shared/SingleSelectDropdown';
import { LookmlModelNavExploreDto } from '../../../dtos/lookmlModelNavExploreDto';
import { getAllExplores } from '../../../server/models/explore';
import { makeStyles } from '@mui/styles';
import EmbedReportRoute from '../../../routes/EmbedRoute';

interface Props {
  t: TFunction;
  defaultFolderId: number;
}
export const createLookModalVisibleState = atom<boolean>({
  key: 'createLookModalVisibleState',
  default: false,
});
const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 540,
    marginBottom: 24,
  },
  dashboardInput: {
    borderRadius: 8,
    border: `1px solid ${StyleVariables.colors.border.default}`,
  },
  dropdown: {
    height: 40,
  },
  mandatoryText: {
    color: StyleVariables.colors.text.critical,
    fontSize: `${StyleVariables.fonts.size.small} !important`,
    marginLeft: 2,
  },
  header: {
    display: 'flex',
    marginBottom: 5,
  },
}));
const CreateLookModal: FunctionComponent<Props> = ({
  t,
  defaultFolderId,
}: Props) => {
  const classes = useStyles();
  const [, setIsLoadingData] = useState<boolean>(false);
  const [visible, setVisible] = useRecoilState(createLookModalVisibleState);
  const history = useHistory();
  const isMounted = useRef(true);
  const [explores, setExplores] = useState<LookmlModelNavExploreDto[]>([]);
  const [selected, setSelected] = useState<{
    modelName: string;
    dataSourceName: string;
  }>();

  const getExplores = useCallback(() => {
    if (explores === undefined || explores.length === 0) {
      setIsLoadingData(true);
      getAllExplores()
        .then((res) => {
          if (isMounted.current) {
            setExplores(res);
          }
        })
        .finally(() => {
          if (isMounted.current) {
            setIsLoadingData(false);
          }
        });
    }
  }, [explores, setExplores, visible]);

  useEffect(() => {
    getExplores();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const successCallback = (look: LookDto) => {
    RedirectTo({
      history,
      path: EmbedReportRoute.lookQueryString(look.folder.id, look.id),
    });
  };
  const handleChange = (event) => {
    setSelected({
      modelName:
        explores.find((e) => e.name === event.target?.value)?.modelName ?? '',
      dataSourceName: event.target?.value,
    });
  };

  const resetModalCallback = () => {
    setSelected({ modelName: '', dataSourceName: '' });
  };

  const saveInFolderModalProps: SaveInFolderModalProps = {
    defaultFolderId: defaultFolderId,
    formSubmitCallback: async (title: string, folderId: number) =>
      await createLook(
        title,
        folderId.toString(),
        selected?.modelName,
        selected?.dataSourceName
      ),
    successCallback: successCallback,
    successMessage: t('lookCreateSuccess'),
    failureMessage: t('lookCreateFail'),
    errorMessage: t('lookCreateError'),
    titleName: 'createLookTitle',
    titleValidationCallback: async (title: string, folderId: number) =>
      await verifyLookNameUniqueIn(title, folderId.toString()),
    notificationMessage: t('lookCreateNotify'),
    placeholder: t('lookCreatePlaceholder'),
    duplicateErrorMessage: t('lookCreateDuplicate'),
    autoFocus: true,
    headerText: t('lookCreateHeader'),
    primaryButtonText: t('lookCreateButton'),
    visible: visible,
    setVisible: (isVisible: boolean) => setVisible(isVisible),
    t: t,
    singleSelect: (
      <>
        <div className={classes.header}>
          <Text as="span">{t('lookDataSourceTitle')}</Text>
          <label className={classes.mandatoryText}>{'*'}</label>
        </div>
        <SingleSelectDropdown
          value={selected?.dataSourceName ?? ''}
          id="data-source-chooser"
          handleChange={handleChange}
          formControlClassName={classes.formControl}
          dropdownClassName={classes.dropdown}
          placeholder={t('lookSelectADataSource')}
        >
          {explores.map((child: LookmlModelNavExploreDto) => {
            return { value: child.name, displayName: child.label };
          })}
        </SingleSelectDropdown>
      </>
    ),
    resetModalCallback: resetModalCallback,
  };

  return <SaveInFolderModal {...saveInFolderModalProps} />;
};

export default withTranslation('ModalWindow')(CreateLookModal);
