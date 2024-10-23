import { Button as NutButton, ButtonProps } from '@nutui/nutui-react-taro';
import classNames from 'classnames';

import './style.less';

export interface ButtonExProps extends Omit<ButtonProps, 'ref'> {
  link: boolean;
}

export const Button = (props: Partial<ButtonExProps>) => {
  const { link, ...rest } = props;
  return <NutButton {...rest} className={classNames(['mc-button', { 'mc-button-link': link }, rest.className])} />;
};

export { default as PhoneNumberButton } from './phone-number';
