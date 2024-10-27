/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-22 10:47:33
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-27 14:34:24
 * @FilePath: /mc-design/packages/mc-ui/src/components/space/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

Space.display = 'mc-space';
