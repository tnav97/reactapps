import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { ReportListItemProps } from '../../../domain/reportListItemProps';

type Props = {
  report: ReportListItemProps;
};

export const showMoveFunction = ({ report }: Props): boolean => {
  const userId = localStorage.getItem('user_id');

  return (
    userId === report.userId?.toString() &&
    localStorage.getItem('user_is_editor') === 'true' &&
    report.elementType === ReportElementTypes.Dashboard
  );
};

export const showKebabMenu = ({ report }: Props): boolean => {
  const userId = localStorage.getItem('user_id');

  const isVisible =
    (userId === report.userId?.toString() &&
      localStorage.getItem('user_is_editor') === 'true' &&
      report.elementType === ReportElementTypes.Dashboard) ||
    report.elementType === ReportElementTypes.Folder;
  return isVisible;
};
