import { Card, Space, UserProfile } from '@bud-fe/mc-ui';
import { Image, Text, View } from '@tarojs/components';
import { times } from 'lodash-es';

export const defaultAvatarImage = 'https://front-static-c.ab-inbev.cn/lowcode/hrb-revamp-default-avatar.png';

const userInfo = { nickName: 'xxx', wasRegister: false, headImgUrl: defaultAvatarImage };
const UserProfileDemo = () => {
  return (
    <Space direction="vertical">
      <Card
        title="用户面板-默认"
        className="user-card"
        classNames={{ body: 'user-card-body', footer: 'user-card-footer' }}
      >
        <UserProfile userInfo={userInfo} />
      </Card>
      <Card
        title="用户面板-自定义"
        className="user-card"
        classNames={{ body: 'user-card-body', footer: 'user-card-footer' }}
        footer={times(3, () => (
          <Image
            className="user-card-footer-button"
            src="https://front-static-c.ab-inbev.cn/lowcode/hrb-revamp-btn-scan.png"
          />
        ))}
      >
        <Space align="center">
          <UserProfile
            userInfo={userInfo}
            profileRender={(user) => {
              if (!user || !user.wasRegister) {
                return null;
              }
              return (
                <View onClick={(e) => e.stopPropagation()}>
                  <Space direction="vertical">
                    <Space align="baseline">
                      <Text className="coin">{1200}</Text>
                      <Text className="unit">哈币</Text>
                    </Space>
                    <Space className="tips" size="small">
                      <Text>如何赚取更多哈币？</Text>
                    </Space>
                  </Space>
                </View>
              );
            }}
          />
        </Space>
      </Card>
    </Space>
  );
};

export default UserProfileDemo;
