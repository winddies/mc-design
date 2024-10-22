import { getPrefixCls } from '@/utils';
import type { FormItemProps, FormProps, TextAreaProps } from '@nutui/nutui-react-taro';
import { Form as NutForm, TextArea } from '@nutui/nutui-react-taro';
import type { InputProps, PickerRegionProps } from '@tarojs/components';
import { Input, Picker } from '@tarojs/components';
import classNames from 'classnames';
import { get, isEmpty, join, omit, toString } from 'lodash-es';
import React, { useMemo } from 'react';

import './style.less';

export interface IRegionPickerProps extends Omit<PickerRegionProps, 'value' | 'onChange'> {
  value: PickerRegionProps.ChangeEventDetail;
  onChange: (value: PickerRegionProps.ChangeEventDetail) => void;
}

export type IFormItemProps = Partial<FormItemProps> &
  (
    | { type: 'input'; fieldProps?: InputProps }
    | { type: 'textarea'; fieldProps?: Partial<TextAreaProps> }
    | { type: 'region'; fieldProps?: Partial<IRegionPickerProps> }
  );
export interface IFormProps extends FormProps {
  items: IFormItemProps[];
  labelInPlaceholder: boolean; // default false
  placement: 'left' | 'right'; // default 'left'
}

const prefix = getPrefixCls('form');

const InnerForm: React.FC<Partial<IFormProps>> = (props) => {
  const formItems = useMemo(() => {
    if (!props.items || isEmpty(props.items)) {
      return props.children;
    }
    return props.items
      .map((item) => {
        if (props.labelInPlaceholder) {
          return {
            ...item,
            label: undefined,
            fieldProps: {
              ...item.fieldProps,
              placeholder: item.label || toString(get(item, ['fieldProps', 'placeholder'])),
            } as any,
          };
        }
        return item;
      })
      .map((item) => {
        const formItemProps = omit(item, 'type', 'fieldProps');
        if (item.type === 'input') {
          return (
            <NutForm.Item key={item.name} getValueFromEvent={(e) => e.target.value} {...formItemProps}>
              <Input {...item.fieldProps} />
            </NutForm.Item>
          );
        }
        if (item.type === 'textarea') {
          return (
            <NutForm.Item key={item.name} {...formItemProps}>
              <TextArea {...item.fieldProps} />
            </NutForm.Item>
          );
        }
        if (item.type === 'region') {
          return (
            <NutForm.Item key={item.name} {...formItemProps}>
              <ReginPicker {...item.fieldProps} />
            </NutForm.Item>
          );
        }
        return <></>;
      });
  }, [props.children, props.items]);

  return (
    <NutForm
      labelPosition="left"
      divider
      {...props}
      className={classNames(prefix, `placement-${props.placement || 'left'}`, props.className)}
    >
      {formItems}
    </NutForm>
  );
};

const ReginPicker: React.FC<Partial<IRegionPickerProps>> = (props) => {
  const _value = useMemo<string[]>(() => {
    if (props.value) {
      return props.value.value;
    }
    return [];
  }, [props.value]);

  return (
    <Picker {...props} mode="region" value={_value} onChange={(e) => props.onChange?.(e.detail)}>
      <Input
        disabled
        placeholder="请选择地区"
        value={isEmpty(_value) ? undefined : join(_value, ' ')}
        className={classNames({ [`${prefix}-placeholder`]: isEmpty(_value) })}
      />
    </Picker>
  );
};

type ComputedFormProps = React.ForwardRefExoticComponent<
  Partial<IFormProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & React.RefAttributes<IFormProps['form']>
> & {
  Item: typeof NutForm.Item;
  useForm: typeof NutForm.useForm;
};

export const Form = InnerForm as ComputedFormProps;
Form.Item = NutForm.Item;
Form.useForm = NutForm.useForm;
