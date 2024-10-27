import { SwiperItem, View } from '@tarojs/components';
import { fromPairs, merge } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { getPrefixCls } from '@/utils';
import { TitledSwiper, TitledSwiperProps } from './titled-swiper';

import './style.less';

const prefix = getPrefixCls('swiper-list');

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
    (swiperIndex: number) => {
      const { swiperProps = {} } = swiperConfig || {};
      return {
        ...swiperProps,
        className: classNames('swiper_wrapper', swiperProps.className),
        style: merge({ height: Taro.pxTransform(448) }, swiperProps.style),
        previousMargin: swiperProps.previousMargin || Taro.pxTransform(50),
        nextMargin: swiperProps.nextMargin || Taro.pxTransform(365),
        current: swiperCurrent?.[swiperIndex],
        onChange: (...args) => handleChange({ ...args, swiperIndex }),
      };
    },
    [handleChange, swiperConfig, swiperCurrent],
  );

  if (!listData || listData?.length === 0) return null;

  return (
    <View className={classNames(prefix, `${prefix}-wrapper`)}>
      {listData?.map((item, index) => {
        const swiperProps = handleSwiperProps(index);
        return (
          <TitledSwiper swiperProps={swiperProps} title={() => renderTitle?.(item)}>
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

SwiperList.displayName = 'mc-swiper-list';

export * from './titled-swiper';
