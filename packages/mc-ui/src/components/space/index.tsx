import { getPrefixCls } from '@/utils';
import type { SpaceProps } from '@nutui/nutui-react-taro';
import { Space as NutSpace } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { assign, isNumber, isString } from 'lodash-es';
import { useMemo } from 'react';

import './style.less';

export interface ISpaceProps extends SpaceProps {
  size: 'small' | 'normal' | 'large' | number;
}

const prefix = getPrefixCls('space');

export const Space = (props: Partial<ISpaceProps>) => {
  const { size = 'normal', ...rest } = props;

  const style = useMemo(() => {
    if (isNumber(size)) {
      return assign({ '--nutui-space-gap': Taro.pxTransform(size) }, props.style);
    }
    return props.style;
  }, [props.style, size]);

  return (
    <NutSpace
      {...rest}
      style={style}
      className={classNames([props.className, { [`${prefix}-size-${size}`]: isString(size) }])}
    />
  );
};
