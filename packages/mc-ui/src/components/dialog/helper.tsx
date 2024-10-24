import { RootPortal } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { uniqueId } from 'lodash-es';
import { createRoot } from 'react-dom/client';
import { Dialog, IDialogExProps } from '.';

class DialogHelper {
  dialogMap = new Map();
  portal: HTMLDivElement | null = null;

  onClose() {
    if (this.portal) {
      const root = createRoot(this.portal);
      root.unmount();
    }
  }

  showDialog(props: Partial<IDialogExProps> = {}) {
    const currentPages = Taro.getCurrentPages();
    const currentPage = currentPages[currentPages.length - 1];
    const root = document.getElementById(currentPage?.$taroPath);

    if (this.dialogMap.has(currentPage)) {
      this.portal = this.dialogMap.get(currentPage);
    } else {
      this.portal = document.createElement('view' as keyof HTMLElementTagNameMap) as any;
      this.portal!.id = uniqueId('dialog-portal-');
      this.dialogMap.set(currentPage, this.portal);
    }

    if (root && this.portal) {
      root.appendChild(this.portal);
    }

    const portalRoot = createRoot(this.portal);
    if (this.portal) {
      portalRoot.render(
        <RootPortal>
          <Dialog
            visible
            lockScroll={false}
            closeOnOverlayClick={false}
            {...props}
            onClose={() => {
              props.onClose?.();
              this.onClose();
            }}
            onConfirm={(e) => {
              props.onConfirm?.(e);
              dialogHelper.onClose();
            }}
            onCancel={() => {
              props.onCancel?.();
              dialogHelper.onClose();
            }}
          />
        </RootPortal>,
      );
    }
  }
  showInfoDialog(props: Partial<IDialogExProps> = {}) {
    this.showDialog({
      ...props,
      closeIcon: true,
      closeOnOverlayClick: true,
      hideCancelButton: true,
      confirmText: props.confirmText || '我知道了',
    });
  }

  showModal(
    options: Omit<Taro.showModal.Option, 'confirmColor' | 'cancelColor'>,
  ): Promise<Taro.showModal.SuccessCallbackResult> {
    return new Promise<Taro.showModal.SuccessCallbackResult>((resolve) => {
      this.showDialog({
        title: options.title,
        content: options.content,
        confirmText: options.confirmText,
        hideCancelButton: !(options.showCancel ?? true),
        cancelText: options.cancelText,
        onConfirm() {
          options.success?.({ confirm: true, cancel: false, errMsg: 'confirm' });
          resolve({ confirm: true, cancel: false, errMsg: 'confirm' });
          dialogHelper.onClose();
        },
        onCancel() {
          options.success?.({ confirm: false, cancel: true, errMsg: 'cancel' });
          resolve({ confirm: false, cancel: true, errMsg: 'cancel' });
          dialogHelper.onClose();
        },
      });
    });
  }
}

export const dialogHelper = new DialogHelper();
