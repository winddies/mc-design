/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-23 16:08:05
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-24 18:30:29
 * @FilePath: /mc-design/packages/mc-ui/src/components/button/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button as NutButton, ButtonProps } from '@nutui/nutui-react-taro';
import classNames from 'classnames';

import './style.less';

export interface ButtonExProps extends Omit<ButtonProps, 'ref'> {}

export const Button = (props: Partial<ButtonExProps>) => {
  const { ...rest } = props;
  return <NutButton {...rest} className={classNames(['mc-button', rest.className])} />;
};

export { default as PhoneNumberButton } from './phone-number';
