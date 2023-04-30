import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { getContentThumbnail } from '../../../server/models/content';
import { Image } from '@alcumus/components';

interface Props {
  data: {
    id: number;
    elementType: ReportElementTypes | undefined;
  };
}

const ReportThumbnailView: FunctionComponent<Props> = ({ data }: Props) => {
  const [thumbnail, setThumbnail] = useState('/images/report_placeholder.png');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    getContentThumbnail(data.id, data.elementType).then((res) => {
      if (isMounted.current) {
        const imageUrl =
          res !== ''
            ? `data:image/svg+xml;base64,${btoa(res)}`
            : '/images/report_placeholder.png';
        setThumbnail(imageUrl);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, [data]);

  return <Image alt="Report Thumbnail" src={thumbnail} lazy={true} />;
};

export default ReportThumbnailView;
