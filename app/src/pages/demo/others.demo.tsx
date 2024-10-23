import { Card, Space, SwiperList } from '@bud-fe/mc-ui';
import { useCallback, useEffect, useState } from 'react';
import { getPointExchange } from './data.mock';
import { Image, Text, View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const isMultiple = false;
const DialogDemo = () => {
  const [swiperListData, setSwiperListData] = useState<any[]>([]);

  useEffect(() => {
    const { data } = getPointExchange();
    setSwiperListData(data);
  }, []);

  const renderProduct = useCallback((prizeInfo, prizeCount?: number): JSX.Element => {
    return (
      <Card
        className={'prize_box'}
        style={{ width: `${100 / (prizeCount || 1)}%` }}
        cover={
          <View className={'prize_info_image_wrapper'}>
            <Image className={'prize_image'} src={prizeInfo?.prizeImg ?? ''} mode="aspectFit" />
          </View>
        }
        title={prizeInfo?.prizeName ?? ''}
        classNames={{
          cover: 'prize_info',
          title: 'prize_name',
          footer: 'prize_active',
        }}
        footer={
          <>
            <View style={{ whiteSpace: 'nowrap' }}>
              <Text className={'count'}>{(prizeInfo?.betNum ?? 0).toLocaleString()}</Text>哈币
            </View>
            <Button className={'prize_active_btn'} size="small">
              立即兑换
            </Button>
          </>
        }
      />
    );
  }, []);
  //   const margeWidth = swiperConfig.nextMargin;
  //   return `${(margeWidth - margeWidth / (itemCount || 1)) * 2}rpx`;
  return (
    <Space
      direction="vertical"
      style={{
        '--mc-titled-swiper-title-padding': `${Taro.pxTransform(36)} ${Taro.pxTransform(54)}`,
      }}
    >
      <SwiperList
        listData={swiperListData}
        renderTitle={(item) => item?.groupKey}
        renderCard={renderProduct}
        itemCount={2}
        swiperConfig={{
          nextMargin: !isMultiple ? Taro.pxTransform((365 - 365 / 2) * 2) : '0px',
        }}
      />
    </Space>
  );
};

export default DialogDemo;
