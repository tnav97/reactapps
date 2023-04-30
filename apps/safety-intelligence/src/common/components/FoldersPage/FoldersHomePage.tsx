import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import PanelSection from '../shared/PanelSection';
import { getHomePageFolders } from '../../../server/models/folder';
import HomePageFolderList from './HomePageFolderList';
import ReportViewToggle, {
  recordCountTableState,
  recordTypeSwitcherState,
} from '../shared/ReportViewToggle';
import { useSetRecoilState } from 'recoil';
import NavBar from '../NavBar';
import { FolderDto } from '../../../dtos/folderDto';
import { Redirect } from 'react-router-dom';

interface Props {
  t: TFunction;
  tReady: boolean;
}

const FoldersHomePage: FunctionComponent<Props> = ({ t, tReady }: Props) => {
  const [folders, setFolders] = useState<FolderDto[]>();
  const isMounted = useRef(true);
  const setCount = useSetRecoilState(recordCountTableState);
  const setType = useSetRecoilState(recordTypeSwitcherState);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    redirectUrl: string;
  }>({ hasError: false, redirectUrl: '' });
  const handleResponseErrors = (err) => {
    if (err.response.status === 404) {
      setErrorState({ hasError: true, redirectUrl: '/notfound' });
    } else {
      setErrorState({ hasError: true, redirectUrl: '/error' });
    }
  };

  const updateFoldersWithResponse = (folders?: FolderDto[]) => {
    if (isMounted.current) {
      const personalFolderIndex: any = folders?.findIndex(
        (item) => item.isPersonal === true
      );
      if (personalFolderIndex !== -1) {
        folders?.splice(personalFolderIndex, 1);
      }
      setFolders(folders);
      setType('all');
      setIsLoading(false);
      setCount(folders?.length || 0);
    }
  };

  const getFolders = useCallback(() => {
    isMounted.current = true;
    setCount(0);
    getHomePageFolders()
      .then(updateFoldersWithResponse)
      .catch((err) => {
        handleResponseErrors(err);
      });
  }, []);

  useEffect(() => {
    getFolders();
    return () => {
      isMounted.current = false;
    };
  }, [getFolders]);

  if (errorState.hasError) {
    return <Redirect to={errorState.redirectUrl} />;
  }
  return (
    <TranslateReady tReady={tReady}>
      <NavBar>
        <PanelSection
          routes={[{ displayName: t('folderHeader'), path: '' }]}
          subTitle={t('folderSubtitle')}
        >
          <ReportViewToggle showDropdown={false} />
          <br />
          <HomePageFolderList
            showTitle={false}
            folders={folders ?? []}
            isLoading={isLoading}
          />
        </PanelSection>
      </NavBar>
    </TranslateReady>
  );
};

export default withTranslation()(FoldersHomePage);
