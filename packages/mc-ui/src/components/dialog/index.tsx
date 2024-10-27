import { getPrefixCls } from '@/utils';
import type { ButtonProps, DialogProps } from '@nutui/nutui-react-taro';
import { Dialog as NutDialog } from '@nutui/nutui-react-taro';
import { Image, View } from '@tarojs/components';
import Taro, { IntersectionObserver } from '@tarojs/taro';
import classNames from 'classnames';
import { isBoolean, uniqueId } from 'lodash-es';
import type { CSSProperties, PropsWithoutRef, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import './style.less';

export interface IDialogExProps extends Omit<DialogProps, 'footerDirection'> {
  closeIcon: boolean | ReactNode; // default false
  closeIconPosition: 'top-left' | 'top-right' | 'bottom'; // default bottom
  footerDirection: 'vertical' | 'horizontal'; // default horizontal

  confirmButtonProps: Partial<PropsWithoutRef<ButtonProps>>;
}

const defaultCloseImage = 'https://front-static-c.ab-inbev.cn/lowcode/hrb-revamp-icon-close.png';

const prefix = getPrefixCls('dialog');

export const Dialog = (props: Omit<Partial<IDialogExProps>, 'ref'>) => {
  // 在运行期间， 为每一个弹窗实例生成一个唯一键，作为 className 传给弹窗节点。（NOTE: Dialog不支持 ID 传入）
  // 用于内部更准确地查找到对应的元素
  const dialogUniqKey = useMemo(() => uniqueId('dialog-'), []);

  const closeIconElm = useMemo(() => {
    if (!props.closeIcon) {
      return null;
    }
    if (isBoolean(props.closeIcon)) {
      return <Image className={`${prefix}-icon-close-default`} mode="widthFix" src={defaultCloseImage} />;
    }
    return props.closeIcon;
  }, [props.closeIcon]);

  const onClose = useCallback(() => {
    props.onClose?.();
  }, [props]);

  const closePortal = useRef<Element | null>();

  useEffect(() => {
    if (!props.closeIcon || !props.visible) {
      return;
    }

    Taro.nextTick(() => {
      const dialogRoot = document.getElementsByClassName(dialogUniqKey)[0]?.parentElement;
      if (!dialogRoot) {
        return;
      }
      Taro.createSelectorQuery()
        .select(`.${dialogUniqKey}`)
        .fields({ rect: true })
        .exec(([closeIconRect]: IntersectionObserver.RelativeRectResult[]) => {
          // 这里计算坐标点，具体的显示的位置 需要依靠 css 的 transform 去微调
          const rect: CSSProperties = {};
          if (props.closeIconPosition === 'top-right') {
            rect.left = closeIconRect.right;
            rect.top = closeIconRect.top;
          } else if (props.closeIconPosition === 'top-left') {
            rect.left = closeIconRect.left;
            rect.top = closeIconRect.top;
          } else {
            rect.left = closeIconRect.left + (closeIconRect.right - closeIconRect.left) / 2;
            rect.top = closeIconRect.bottom;
          }
          if (!rect.left || !rect.top) {
            return <></>;
          }
          if (!closePortal.current) {
            closePortal.current = document.createElement('view' as keyof HTMLElementTagNameMap) as any;
            dialogRoot.appendChild(closePortal.current!);
          }
          if (closePortal.current) {
            const root = createRoot(closePortal.current);

            root.render(
              <View
                className={classNames([
                  `${prefix}-icon-close`,
                  `${prefix}-icon-close-${props.closeIconPosition || 'bottom'}`,
                ])}
                onClick={onClose}
                style={rect}
              >
                {closeIconElm}
              </View>,
            );
          }
        });
    });
  }, [closeIconElm, dialogUniqKey, onClose, props.closeIcon, props.closeIconPosition, props.visible]);

  return <NutDialog {...props} className={classNames([dialogUniqKey, prefix, props.className])} />;
};

Dialog.displayName = 'mc-dialog';
