import { ReportListItemProps } from '../../../domain/reportListItemProps';

type Props = {
  content: ReportListItemProps[];
  contentFavoriteId?: number;
};

const handleOnDeleteFavorite = ({
  content,
  contentFavoriteId,
}: Props): ReportListItemProps[] => {
  if (!contentFavoriteId) return content;
  return content.filter((x) => x.contentFavoriteId !== contentFavoriteId);
};

export default handleOnDeleteFavorite;
