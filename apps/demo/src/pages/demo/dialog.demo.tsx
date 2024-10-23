import { Card, Dialog, Space, dialogHelper } from '@bud-fe/mc-ui';

import { Cell } from '@nutui/nutui-react-taro';
import { RootPortal, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { omit } from 'lodash-es';
import { useState } from 'react';

const DialogDemo = () => {
  return (
    <Space direction="vertical">
      <BaseDialogUsage />
      <FunctionalDialogUsage />
    </Space>
  );
};

const baseUsageConfig = {
  closeOnOverlayClick: false,
  onCancel: () => Taro.showToast({ title: 'onCancel', icon: 'none' }),
  onConfirm: () => {
    Taro.showToast({ title: 'onConfirm', icon: 'none' });
  },
  content: '自带 取消 和 确认按钮',
};

const BaseDialogUsage = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const openDialog = (key: string | number) => {
    setVisible((raw) => ({ ...raw, [key]: true }));
  };
  const closeDialog = (key: string | number) => {
    setVisible((raw) => ({ ...raw, [key]: false }));
  };

  return (
    <Card>
      <Cell.Group title="对话框-基础用法">
        <Cell title="点我打开对话框-1" description="基础用法-模态" onClick={openDialog.bind(this, '1')} />
        <Cell title="点我打开对话框-2" description="基础用法-非模态" onClick={openDialog.bind(this, '2')} />
        <Cell title="点我打开对话框-3" description="基础用法-带有关闭按钮" onClick={openDialog.bind(this, '3')} />
        <Cell title="点我打开对话框-4" description="自定义 children" onClick={openDialog.bind(this, '4')} />
        <Cell title="点我打开对话框-5" description="自定义 按钮文本" onClick={openDialog.bind(this, '5')} />
        <Cell title="点我打开对话框-6" description="自定义 仅保留确认按钮" onClick={openDialog.bind(this, '6')} />
        <Cell title="点我打开对话框-7" description="自定义 仅保留确认按钮" onClick={openDialog.bind(this, '7')} />
      </Cell.Group>
      <RootPortal>
        <Dialog {...baseUsageConfig} visible={visible['1']} onClose={closeDialog.bind(this, '1')} title="模态对话框" />
        <Dialog
          {...baseUsageConfig}
          title="非模态对话框"
          visible={visible['2']}
          closeOnOverlayClick
          onClose={closeDialog.bind(this, '2')}
        />
        <Dialog
          {...baseUsageConfig}
          title="对话框-3"
          visible={visible['3']}
          onClose={closeDialog.bind(this, '3')}
          closeIcon // 关闭按钮
        />
        <Dialog
          {...omit(baseUsageConfig, 'content')}
          title="对话框-4"
          visible={visible['4']}
          onClose={closeDialog.bind(this, '4')}
        >
          <View>自定义弹窗内容，支持 ReactNode</View>
        </Dialog>
        <Dialog
          {...baseUsageConfig}
          title="对话框-5"
          visible={visible['5']}
          onClose={closeDialog.bind(this, '5')}
          cancelText="cancelText"
          confirmText="confirmText"
        />
        <Dialog
          {...baseUsageConfig}
          title="对话框-6"
          visible={visible['6']}
          onClose={closeDialog.bind(this, '6')}
          hideCancelButton
          confirmText="我知道了"
          onConfirm={closeDialog.bind(this, '6')}
        />
        <Dialog
          {...baseUsageConfig}
          title="对话框-7"
          visible={visible['7']}
          onClose={closeDialog.bind(this, '7')}
          closeIcon
          closeOnOverlayClick={false}
          // footer={null}
        />
      </RootPortal>
    </Card>
  );
};

const FunctionalDialogUsage = () => {
  const openDialog1 = () => {
    dialogHelper.showDialog(baseUsageConfig);
  };
  const openDialog2 = () => {
    dialogHelper.showInfoDialog(baseUsageConfig);
  };
  const openDialog3 = () => {
    dialogHelper.showModal({
      title: '代替系统对话框',
      content: '等同于wx.showModal',
      cancelText: 'cancelText',
      confirmText: 'confirmText',
    });
  };
  const openDialog4 = () => {
    dialogHelper.showModal({
      title: '代替系统对话框',
      content: '等同于wx.showModal',
      cancelText: 'cancelText',
      confirmText: 'confirmText',
      showCancel: false,
    });
  };

  return (
    <Card>
      <Cell.Group title="对话框-函数式用法">
        <Cell title="点我打开对话框-1" description="函数式用法-普通对话框，参数和基础用法一致" onClick={openDialog1} />
        <Cell title="点我打开对话框-2" description="函数式用法-消息确认" onClick={openDialog2} />
        <Cell
          title="点我打开对话框-3"
          description="函数式用法-系统对话框的API, 等同于wx.showModal, 暂不支持按钮颜色设置"
          onClick={openDialog3}
        />
        <Cell title="点我打开对话框-4" description="函数式用法-系统对话框的API-无取消按钮" onClick={openDialog4} />
      </Cell.Group>
    </Card>
  );
};
export default DialogDemo;
