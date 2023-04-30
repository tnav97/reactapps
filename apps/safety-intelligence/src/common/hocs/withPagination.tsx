/* eslint-disable react/display-name */
import React, { FunctionComponent } from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { paginationPageSizes } from '../constants/defaultPageSizes';

export interface CustomPaginationProps extends PaginationProps {
  hidePagination?: boolean | undefined;
}

const CustomPagination: FunctionComponent<CustomPaginationProps> = (
  props: CustomPaginationProps
) => {
  const defaults: PaginationProps = {
    responsive: true,
    showSizeChanger: false,
    defaultCurrent: 1,
    hideOnSinglePage: true,
    pageSizeOptions:
      props.pageSizeOptions ?? paginationPageSizes.map((x) => String(x)),
  };
  const paginationProps: CustomPaginationProps = {
    ...props,
    ...defaults,
  };
  return <Pagination {...paginationProps} />;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const withPagination =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & CustomPaginationProps> =>
  ({ ...props }: CustomPaginationProps) => {
    return (
      <span>
        <Component {...(props as P)} />
        <div className={props.total ? 'p-vertical10' : ''}>
          <CustomPagination {...(props as PaginationProps)} />
        </div>
      </span>
    );
  };
