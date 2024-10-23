import { Tabs } from '@nutui/nutui-react-taro';
import { map } from 'lodash-es';

import './index.less';

const demos = [
  { title: '基础组件', value: ' base', Component: require(`./base.demo`).default },
  { title: '对话框', value: 'dialog', Component: require(`./dialog.demo`).default },
  { title: '卡片', value: 'card', Component: require(`./card.demo`).default },
  { title: '表单', value: 'form', Component: require(`./form.demo`).default },
  { title: '其它', value: 'others', Component: require(`./others.demo`).default },
  // { title: '用户面板', value: 'user-profile', Component: require(`./user-profile.demo`).default },
];

const tabs = map(demos, ({ title, value, Component }) => (
  <Tabs.TabPane className="record-tabs-pane" title={title} value={value}>
    <Component />
  </Tabs.TabPane>
));

const Demo = () => {
  return (
    <Tabs tabStyle={{ position: 'sticky', top: '0px', zIndex: 11 }} defaultValue={demos[0].value}>
      {tabs}
    </Tabs>
  );
};

export default Demo;
