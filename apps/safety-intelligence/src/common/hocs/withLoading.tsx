/* eslint-disable react/display-name */
import React, { CSSProperties } from 'react';
import { Skeleton } from 'antd';
import Spin, { SpinIndicator } from 'antd/lib/spin';

type Props = {
  isLoading: boolean;
  wrapperStyle?: CSSProperties;
  indicator?: SpinIndicator;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const withSkeletonLoading =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & Props> =>
  ({ isLoading, wrapperStyle, ...props }: Props) =>
    isLoading ? (
      <div style={wrapperStyle}>
        <Skeleton active round />
      </div>
    ) : (
      <Component {...(props as P)} />
    );

// eslint-disable-next-line @typescript-eslint/ban-types
export const withLoading =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & Props> =>
  ({ isLoading, wrapperStyle, indicator, ...props }: Props) =>
    (
      <div style={wrapperStyle}>
        <Spin spinning={isLoading} indicator={indicator}>
          <Component {...(props as P)} />
        </Spin>
      </div>
    );
