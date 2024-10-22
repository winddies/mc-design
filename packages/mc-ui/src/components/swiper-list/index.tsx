import { Swiper, SwiperItem, SwiperProps, View } from '@tarojs/components';
import { fromPairs, isFunction, merge } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import Taro from '@tarojs/taro';

import './style.less';

export interface ISwiperListProps {
  listData: any[];
  listMapKey: string;
  itemCount?: number;
  isMultiple?: boolean;
  swiperConfig?: Partial<TitledSwiperProps>;
  renderCard?: (item: any) => JSX.Element;
  renderTitle?: (item: any) => JSX.Element;
}

export const SwiperList: React.FC<ISwiperListProps> = (props: ISwiperListProps) => {
  const {
    listData,
    listMapKey = 'items',
    isMultiple = false,
    itemCount = 2,
    swiperConfig,
    renderCard,
    renderTitle,
  } = props;

  const [swiperCurrent, setSwiperCurrent] = useState<{ [key in number]: any }>();

  useEffect(() => {
    setSwiperCurrent({ ...fromPairs(listData.map((_, index) => [index, 0])) });
  }, [listData]);

  const handleChange = useCallback((params, isScrollTrigger = true, isPrev = true) => {
    if (isScrollTrigger) {
      setSwiperCurrent((pre) => ({ ...pre, [params?.swiperIndex]: params[0]?.detail?.current ?? 0 }));
    } else {
      setSwiperCurrent((pre) => ({
        ...pre,
        [params?.swiperIndex]: isPrev ? pre?.[params?.swiperIndex] - 1 : pre?.[params?.swiperIndex] + 1,
      }));
    }
  }, []);

  // const countManagePx = useCallback(() => {
  //   const margeWidth = swiperConfig.nextMargin;
  //   return `${(margeWidth - margeWidth / (itemCount || 1)) * 2}rpx`;
  // }, [itemCount, swiperConfig.nextMargin]);

  const handleSwiperProps = useCallback(
    (swiperIndex: number) => ({
      ...swiperConfig,
      className: classNames('swiper_wrapper', swiperConfig?.className),
      style: merge({ height: '447rpx' }, swiperConfig?.style),
      previousMargin: swiperConfig?.previousMargin || Taro.pxTransform(50),
      nextMargin: swiperConfig?.nextMargin || Taro.pxTransform(365),
      current: swiperCurrent?.[swiperIndex],
      onChange: (...args) => handleChange({ ...args, swiperIndex }),
    }),
    [handleChange, isMultiple, swiperConfig?.previousMargin, swiperCurrent],
  );

  if (!listData || listData?.length === 0) return null;

  return (
    <View className="swiper_list_wrapper">
      {listData?.map((item, index) => {
        const swiperProps = handleSwiperProps(index);
        return (
          <TitledSwiper {...swiperProps} title={() => renderTitle?.(item)}>
            <SwiperItems
              isMultiple={isMultiple}
              renderCard={renderCard}
              itemCount={itemCount}
              items={item?.[listMapKey]}
            />
          </TitledSwiper>
        );
      })}
    </View>
  );
};

const SwiperItems: React.FC<{
  isMultiple: boolean;
  itemCount: number;
  items: Array<any>;
  renderCard?: (item: any) => JSX.Element;
}> = (props) => {
  const { isMultiple, itemCount, items, renderCard } = props;

  const renderContent = useCallback(
    (prizeInfo: any, prizeCount?: number) => {
      return <View style={{ width: `${100 / (prizeCount || 1)}%`, height: 'auto' }}>{renderCard?.(prizeInfo)}</View>;
    },
    [renderCard],
  );

  const swiperItems = useMemo(() => {
    if (isMultiple) {
      return [...new Array(Math.ceil(Number(items.length) / itemCount))].map((_, j) => (
        <SwiperItem className="swiper_item_style_count" style={{ width: `${100 / itemCount}% !important` }}>
          {[...new Array(itemCount)].map((__, k) => renderContent(items[j * itemCount + k], itemCount))}
        </SwiperItem>
      ));
    }
    return items.map((item, index) => (
      <SwiperItem className="swiper_item_style" style={{ width: `${100 / itemCount}% !important` }}>
        {renderContent(item, index)}
      </SwiperItem>
    ));
  }, [items, renderContent, isMultiple, itemCount]);

  return swiperItems;
};

export interface TitledSwiperProps extends SwiperProps {
  title: React.ReactNode | (() => React.ReactNode);
  titleClassName: string;
  titleStyle: React.CSSProperties;

  contentClassName: string;
  contentStyle: React.CSSProperties;
}

export const TitledSwiper: React.FC<Partial<TitledSwiperProps>> = (props) => {
  const { title, titleClassName, titleStyle, contentStyle, contentClassName, ...rest } = props;

  const titleNode = useMemo(() => {
    if (isFunction(title)) {
      return title();
    }
    return title;
  }, [title]);

  return (
    <View className="titled-swiper-container">
      <View className={classNames('group_title', titleClassName)} style={titleStyle}>
        {titleNode}
      </View>
      <View className={classNames('content', contentClassName)} style={contentStyle}>
        <Swiper {...rest} className={classNames('swiper_wrapper', rest.className)} />
      </View>
    </View>
  );
};
