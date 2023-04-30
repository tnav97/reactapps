import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { syncExternalSiteFilterState } from './EmbedReportPage';
import {
  getEmbedReportUri,
  getFilterUpdatePostMessage,
  getReportRunMessage,
} from '../../../server/models/report';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { CircularProgress, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  embedReportId?: string;
  embedReportType: ReportElementTypes;
};

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
  },
  iframe: {
    border: 'none',
    height: '100vh',
    width: '100%',
  },
}));
const EmbedReport: FunctionComponent<Props> = ({
  embedReportId,
  embedReportType,
}: Props) => {
  const classes = useStyles();
  const [embedReportUri, setEmbedReportUri] = useState('');
  const selectedSiteIds = [];
  const [syncExternalSiteFilter, setSyncExternalSiteFilter] = useRecoilState(
    syncExternalSiteFilterState
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedHostUrl: string = localStorage.getItem('embed_host') ?? '';
  const [showSpinner, setShowSpinner] = useState(false);

  const getReport = useCallback(() => {
    setShowSpinner(true);
    getEmbedReportUri(embedReportId as string, embedReportType, selectedSiteIds)
      .then((uri) => {
        return setEmbedReportUri(uri);
      })
      .finally(() => setShowSpinner(false));
  }, [embedReportId, embedReportType]);

  const onExternalFilterChange = useCallback(() => {
    try {
      if (syncExternalSiteFilter) {
        iframeRef?.current?.contentWindow?.postMessage(
          getFilterUpdatePostMessage(embedReportType, selectedSiteIds),
          embedHostUrl
        );

        iframeRef?.current?.contentWindow?.postMessage(
          getReportRunMessage(embedReportType),
          embedHostUrl
        );
      }
    } finally {
      setSyncExternalSiteFilter(false);
    }
  }, [syncExternalSiteFilter]);

  useEffect(() => {
    onExternalFilterChange();
  }, [onExternalFilterChange]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  return (
    <Paper elevation={0} className={classes.paper}>
      {showSpinner ? (
        <CircularProgress />
      ) : (
        <iframe
          ref={iframeRef}
          id="ec-si-embed-iframe"
          src={embedReportUri}
          className={classes.iframe}
        />
      )}
    </Paper>
  );
};

export default EmbedReport;
