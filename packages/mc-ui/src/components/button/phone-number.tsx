/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-14 11:25:00
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-22 10:52:55
 * @FilePath: /mc-design/packages/mc-ui/src/components/button/phone-number.tsx
 * @Description: 手机号授权按钮
 */
import { Button, ButtonProps } from '@nutui/nutui-react-taro';
import { useRef, useState, MouseEvent } from 'react';

export interface IPhoneNumberButtonProps
  extends Omit<Partial<ButtonProps>, 'onClick' | 'openType' | 'onGetPhoneNumber' | 'ref'> {
  /** 点击事件, 如果 canCallPhoneNumber 为 true，则 code 为来自微信授权的动态令牌，如果为 false，则相当于普通 button 直接调用 onClick */
  onClick: (data?: string | MouseEvent) => void;
  /** 能否调起微信授权获取手机号，如果为false，则相当于普通 button 直接调用 onClick */
  canCallPhoneNumber?: boolean;
  /** 是否同意隐私授权 */
  isAgreePrivacyAuthorization?: boolean;
}

/** 手机号授权按钮 */
export default function PhoneNumberButton({
  onClick,
  canCallPhoneNumber = true,
  isAgreePrivacyAuthorization = false,
  ...others
}: IPhoneNumberButtonProps) {
  const dynamicCodeRef = useRef<string>(''); // 来自微信授权的动态令牌
  const [hasDynamicCodeRef, setHasDynamicCodeRef] = useState(false); // 是否已经获取过授权动态令牌

  const getPhoneNumber = (e) => {
    const {
      detail: { code },
    } = e;
    if (!code) {
      onClick();
      setHasDynamicCodeRef(false);
      return;
    }

    dynamicCodeRef.current = code;

    onClick(code);

    setHasDynamicCodeRef(true);
  };

  return (
    <Button
      {...(!hasDynamicCodeRef &&
        canCallPhoneNumber && {
          openType: isAgreePrivacyAuthorization ? 'getPhoneNumber|agreePrivacyAuthorization' : 'getPhoneNumber',
          onGetPhoneNumber: getPhoneNumber,
        })}
      {...((hasDynamicCodeRef || !canCallPhoneNumber) && {
        onClick: (e: MouseEvent<HTMLButtonElement>) => onClick(canCallPhoneNumber ? dynamicCodeRef.current : e),
      })}
      {...others}
    />
  );
}

PhoneNumberButton.displayName = 'mc-phone-number-button';
