import { Card, Space } from '@bud-fe/mc-ui';
import { Button } from '@tarojs/components';
import { map, times } from 'lodash-es';

const SpaceDemo = () => {
  return (
    <Space style={{ padding: 20 }} direction="vertical">
      <Card title="布局-水平间距">
        <Space wrap={false} direction="vertical">
          {map(['large', 'normal', 'small'], (size) => (
            <Space size={size as any} direction="horizontal" style={{ backgroundColor: 'lightgray' }}>
              {times(3, () => (
                <Button size="mini">按钮</Button>
              ))}
            </Space>
          ))}
        </Space>
      </Card>
      <Card title="布局-垂直间距">
        <Space wrap={false}>
          {map(['large', 'normal', 'small'], (size) => (
            <Space size={size as any} direction="vertical" style={{ backgroundColor: 'lightgray' }}>
              {times(3, () => (
                <Button size="mini">按钮</Button>
              ))}
            </Space>
          ))}
        </Space>
      </Card>
    </Space>
  );
};

export default SpaceDemo;
