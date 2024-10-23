import { Card, Space } from '@bud-fe/mc-ui';
import { Button, Image, Text, View } from '@tarojs/components';

const SpaceDemo = () => {
  return (
    <Space style={{ padding: 20 }} direction="vertical">
      <Card title="基础卡片|卡片标题">
        <View>卡片内容</View>
        <View>卡片内容</View>
        <View>卡片内容</View>
        <View>卡片内容</View>
      </Card>
      <Card title="基础卡片|自定义 Footer" footer={<View>支持自定义卡片 Footer</View>}>
        <View>卡片内容</View>
        <View>卡片内容</View>
        <View>卡片内容</View>
        <View>卡片内容</View>
      </Card>
      <Card
        title="基础卡片|带有封面"
        cover={<Image src="https://front-static-c.ab-inbev.cn/lowcode/MVP-371-sku.png" mode="aspectFit" />}
      >
        <View>卡片内容</View>
        <View>卡片内容</View>
        <View>卡片内容</View>
        <View>卡片内容</View>
      </Card>
      <Card title="商品卡片">
        <Card
          className="goods-card"
          cover={<Image src="https://front-static-c.ab-inbev.cn/lowcode/MVP-371-sku.png" mode="aspectFit" />}
          title="冰极纯生500ml*12"
          classNames={{
            cover: 'goods-card-cover',
            title: 'goods-card-title',
            footer: 'goods-card-footer',
          }}
          footer={
            <>
              <View>
                <Text>1</Text>
                <Text>哈币</Text>
                <Text>2</Text>
              </View>
              <Button size="default">再扫码1次</Button>
            </>
          }
        />
      </Card>
    </Space>
  );
};

export default SpaceDemo;
