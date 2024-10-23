import { Card, Dialog, Form, IFormProps, Space } from '@bud-fe/mc-ui';
import { useBoolean } from '@taro-hooks/ahooks';
import { Button, RootPortal, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMemo } from 'react';

const DialogDemo = () => {
  const items = useMemo<IFormProps['items']>(
    () => [
      { type: 'input', label: '输入框', name: 'input', fieldProps: { placeholder: '请输入....' } },
      { type: 'textarea', label: '文本框', name: 'textarea', fieldProps: { maxLength: 100, showCount: true } },
      { type: 'region', label: '区域', name: 'region' },
    ],
    [],
  );

  const [form] = Form.useForm();

  const [formModalVisible, { setTrue: openFormModal, setFalse: closeFormModal }] = useBoolean();

  return (
    <Space direction="vertical">
      <Card title="普通表单-基础样式">
        <Form items={items} form={form} />
      </Card>
      <Card title="普通表单-右对齐">
        <Form items={items} form={form} placement="right" />
      </Card>
      <Card title="普通表单-label-in-placeholder">
        <Form items={items} form={form} labelInPlaceholder />
      </Card>
      <Card title="自定义提交">
        <Form
          items={items}
          form={form}
          footer={<Button onClick={form.submit}>submit</Button>}
          onFinishFailed={(_, errors) => Taro.showToast({ title: errors[0].message, icon: 'none' })}
          onFinish={() => {
            Taro.showToast({ title: 'onFinish' });
          }}
        />
      </Card>
      <Card title="弹窗表单">
        <Button onClick={openFormModal}>打开表单</Button>
        <RootPortal>
          <Dialog
            lockScroll={false}
            title="弹窗表单"
            visible={formModalVisible}
            onCancel={closeFormModal}
            onClose={openFormModal}
            confirmText="submit"
            onConfirm={form.submit}
          >
            <View style={{ maxHeight: '400rpx', overflowY: 'scroll' }}>
              <Form
                items={items}
                form={form}
                onFinishFailed={(_, errors) => Taro.showToast({ title: errors[0].message, icon: 'none' })}
                onFinish={() => {
                  Taro.showToast({ title: 'onFinish' });
                }}
              />
            </View>
          </Dialog>
        </RootPortal>
      </Card>
    </Space>
  );
};

export default DialogDemo;
