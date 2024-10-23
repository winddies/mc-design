import { getPrefixCls } from '@/utils';
import { Swiper, SwiperProps, View } from '@tarojs/components';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import React, { useMemo } from 'react';

const prefix = getPrefixCls('titled-swiper');

export interface TitledSwiperProps {
  containerClassName: string;

  title: React.ReactNode | (() => React.ReactNode);
  titleClassName: string;
  titleStyle: React.CSSProperties;

  contentClassName: string;
  contentStyle: React.CSSProperties;

  swiperProps: Partial<SwiperProps>;

  children?: React.ReactNode;
}

export const TitledSwiper: React.FC<Partial<TitledSwiperProps>> = (props) => {
  const { swiperProps } = props;

  const title = useMemo(() => {
    if (isFunction(props.title)) {
      return props.title();
    }
    return props.title;
  }, [props]);

  return (
    <View className={classNames(prefix, props.containerClassName)}>
      <View className={classNames(`${prefix}-title`, props.titleClassName)} style={props.titleStyle}>
        {title}
      </View>
      <View className={classNames(`${prefix}-content`, props.contentClassName)} style={props.contentStyle}>
        <Swiper {...swiperProps} className={classNames(`${prefix}-swiper`, swiperProps.className)}>
          {props.children}
        </Swiper>
      </View>
    </View>
  );
};
