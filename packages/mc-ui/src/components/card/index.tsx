import { getPrefixCls } from '@/utils';
import { View, ViewProps } from '@tarojs/components';
import classNames from 'classnames';
import * as React from 'react';

import './style.less';

export interface ICardProps extends ViewProps {
  title?: React.ReactNode;
  cover?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean; // default true
  classNames?: {
    cover?: string;
    title?: string;
    body?: string;
    footer?: string;
  };
  styles?: {
    cover?: React.CSSProperties;
    title?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
  };
}

const prefix = getPrefixCls('card');
export const Card = (props: ICardProps) => {
  const { cover, title, footer, bordered = true, classNames: clsNames, styles: customStyles, children } = props;
  return (
    <View
      {...props}
      className={classNames([`${prefix}-container`, props.className, { [`${prefix}-container-bordered`]: bordered }])}
    >
      {cover && (
        <View className={classNames([`${prefix}-cover`, clsNames?.cover])} style={customStyles?.cover}>
          {cover}
        </View>
      )}
      {title && (
        <View className={classNames([`${prefix}-title`, clsNames?.title])} style={customStyles?.title}>
          {title}
        </View>
      )}
      {children && (
        <View className={classNames([`${prefix}-body`, clsNames?.body])} style={customStyles?.body}>
          {children}
        </View>
      )}
      {footer && (
        <View className={classNames([`${prefix}-footer`, clsNames?.footer])} style={customStyles?.footer}>
          {footer}
        </View>
      )}
    </View>
  );
};

Card.displayName = 'mc-card';
