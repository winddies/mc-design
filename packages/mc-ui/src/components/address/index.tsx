/* eslint-disable prefer-promise-reject-errors */
/*
 * 触发授权的时机。
 * 1、当指定了先决条件为 privacy 时，会在隐私政策授权完成后触发。
 * 2、没有指定先决条件时，每当页面显示时触发。
 * 3、用户点击后触发。
 *
 * 使用方式
 * 方式1：不阻止默认行为，自动处理授权问题。
 * 方式2：阻止默认行为，将授权问题交给上层处理。一般在用户参与活动的时候进行授权时，需要阻止该组件的默认行为。
 *
 * @Author: zenon.zhang
 * @Date: 2024-08-12 18:05:45
 * @Last Modified by: zenon.zhang
 * @Last Modified time: 2024-10-23 14:12:11
 */
import Event from '@/constants/event';
import { useAddress } from '@/hooks/useAddress';
// import { dialogHelper } from "@/utils/dialog-helper";
import { Space } from '@nutui/nutui-react-taro';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Text, View, ViewProps } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { compact, isEmpty } from 'lodash-es';
import { useRequest } from 'taro-hooks';

import './index.less';

export interface AddressProps extends ViewProps {
  /** 未获得地理位置时的默认提示语 */
  defaultTip?: string;
  /** 先决条件 */
  prerequisite?: 'privacy';
  /** 是否要阻止向用户索要地理位置权限 */
  preventAutoAuthorize?: boolean;
  /** 获取地理位置授权信息为被拒绝时触发 */
  onLocationAuthDenied?: () => void;
  /** 获取地理位置授权信息失败时触发 */
  onLocationAuthFailed?: () => void;
}

export default function Address(props: AddressProps) {
  const { address, clearAddress, location, setLocation, fetchAddressInfo } = useAddress();

  // authorized
  // undefined: 尚未向用户发起授权请求。
  // true: 用户授权了地理位置，此时才可以展示省市区信息。
  // false: 用户拒绝了地理位置授权，此时引导用户打开微信设置面板，页面再次显示时，会再次检查授权状态。
  const [authorized, setAuthorized] = useState<boolean | undefined>();

  const checkSystemAuthorize = useCallback(async () => {
    // 1、获取设备设置
    const { locationEnabled } = Taro.getSystemSetting();
    if (!locationEnabled) {
      return Promise.reject({
        errMsg: 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF',
      });
    }
    // 2、获取微信APP授权设置
    const { locationAuthorized } = Taro.getAppAuthorizeSetting();
    // Taro.openAppAuthorizeSetting 打开对应的系统设置页面
    if (locationAuthorized === 'denied') {
      return Promise.reject({
        errMsg: 'getLocation:fail:system permission denied',
      });
    }
    return Promise.resolve();
  }, []);

  const _authorizeLocation = useCallback<(params?: { autoAuthorize: boolean }) => Promise<void>>(
    async (params = { autoAuthorize: true }) => {
      const { autoAuthorize } = params;
      const { needAuthorization } = await new Promise<Taro.getPrivacySetting.SuccessCallbackResult>((resolve) => {
        Taro.getPrivacySetting({ success: resolve });
      });
      if (autoAuthorize && props.prerequisite === 'privacy' && needAuthorization) {
        return Promise.reject({ errMsg: 'exception:need-authorization' });
      }
      if (autoAuthorize && props.preventAutoAuthorize) {
        if (needAuthorization) {
          return Promise.reject({
            errMsg: 'exception:page-prevent-auto-authorize',
          });
        }
        const { authSetting } = await Taro.getSetting();
        if (!authSetting['scope.userLocation']) {
          return Promise.reject({
            errMsg: 'exception:page-prevent-auto-authorize',
          });
        }
      } else {
        // 提前向用户发起授权请求。
        // 调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。
        // 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
        // Taro.authorize 会抛出以下两个异常
        // 1、用户拒绝了隐私政策
        // {"errno":104,"errMsg":"authorize:fail privacy permission is not authorized"}
        // 2、用户拒绝了地理位置授权
        // {"errMsg":"authorize:fail auth deny"} 或者 {"errMsg":"authorize:fail:auth deny"}
        await Taro.authorize({ scope: 'scope.userLocation' });
      }
      // 为了减少getLocation的调用次数，提高接口的成功率，调用之前，先确保地理位置相关的设置是正确的。
      // 如果设置有问题， 会抛出以下两个异常
      // 1、用户关闭了地理位置开关
      // {"errMsg": "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF", "errCode": 2}
      // 2、用户手机禁止微信访问位置权限
      // {"errMsg": "getLocation:fail:system permission denied"}
      await checkSystemAuthorize();

      if (!location) {
        // 这里做一个优化
        // 当 location 不存在时，才去获取地址信息。
        // 避免重复获取地址信息，导致接口调用次数过多。
        const res = await Taro.getLocation({ type: 'gcj02' });
        setLocation(res);
      }
      setAuthorized(true);
    },
    [checkSystemAuthorize, location, props.prerequisite, props.preventAutoAuthorize, setLocation],
  );
  const authorizeLocation = useCallback(
    async (params: { autoAuthorize: boolean } = { autoAuthorize: true }) => {
      try {
        await _authorizeLocation(params);
      } catch (error) {
        setAuthorized(false);
        throw error;
      }
    },
    [_authorizeLocation],
  );

  useEffect(() => {
    // 当先决条件是隐私政策时，也就是说隐私政策是在其它地方处理的。
    // 通过监听事件，来处理授权状态的变化。
    if (props.prerequisite === 'privacy') {
      Taro.eventCenter.on(Event.PRIVACY_AUTH_RESOLVED, authorizeLocation);
      // Taro.eventCenter.on(Event.PRIVACY_AUTH_REJECT, authorizeLocation);
      return () => {
        Taro.eventCenter.off(Event.PRIVACY_AUTH_RESOLVED, authorizeLocation);
        // Taro.eventCenter.off(Event.PRIVACY_AUTH_REJECT, authorizeLocation);
      };
    }
  }, [authorizeLocation, props.prerequisite]);

  // 页面每次显示时，检查是否授权了地理位置的权限
  Taro.useDidShow(() =>
    authorizeLocation().catch(() => {
      setLocation(null);
      clearAddress();
    }),
  );

  const onClick = async () => {
    // 当手动点击按钮时，也可能会触发隐私弹窗， 此时为了防止重复授权，需要取消对隐私授权的监听。
    if (props.prerequisite === 'privacy') {
      Taro.eventCenter.off(Event.PRIVACY_AUTH_RESOLVED, authorizeLocation);
      // Taro.eventCenter.off(Event.PRIVACY_AUTH_REJECT, authorizeLocation);
    }

    const { authSetting } = await Taro.getSetting();
    const showModel = authSetting['scope.userLocation'] === false;

    authorizeLocation({ autoAuthorize: false }).catch((error) => {
      const { errMsg } = error;
      // 当无法正常获取到地址信息时，需要引导用户打开对应的设置
      if (errMsg.includes('getLocation:fail')) {
        // 系统层的设置问题 - 可以引导用户打开系统权限页面
        // Taro.openAppAuthorizeSetting();
        // 暂时用Toast提示用户
        props.onLocationAuthFailed?.();
        Taro.showToast({ title: '获取位置失败，请检查定位设置', icon: 'none' });
      } else if (errMsg.includes('auth deny')) {
        // 小程序授权问题 - 打开小程序设置面板
        showModel && props.onLocationAuthDenied?.();
      } else {
        // 其它异常 暂不处理
      }
    });
  };

  useRequest(
    async () => {
      if (!props.preventAutoAuthorize && authorized === false) {
        clearAddress();
      } else if (location) {
        fetchAddressInfo(location);
      }
    },
    {
      refreshDeps: [authorized, location],
    },
  );

  const addressText = useMemo(() => {
    if (!address || isEmpty(address)) {
      return props.defaultTip || '授权地理位置查看附近活动';
    }
    return compact([address.provinceName, address.cityName, address.districtName]).join(' ');
  }, [address, props.defaultTip]);

  return (
    <View
      {...props}
      className={classNames(['mc-address', props.className])}
      onClick={!location || !authorized ? onClick : undefined}
    >
      <Space align="end" wrap={false}>
        <View className={'mc-address-left'}>
          <Image
            src="https://front-static-c.ab-inbev.cn/lowcode/hrb-revamp-icon-loc.png"
            className={'mc-address-icon'}
          />
          <Text>位置:</Text>
        </View>
        <Text>{addressText}</Text>
      </Space>
    </View>
  );
}

// export const openLocationSettingDialog = () => {
//   dialogHelper.showDialog({
//     closeOnOverlayClick: true,
//     // closeIcon: true,
//     content: (
//       <View className={styles["auth-content"]}>
//         <View className={styles["content-bg"]} />
//         <View className={styles["content-text"]}>需要获取您的地理位置信息</View>
//       </View>
//     ),
//     confirmText: "授权并查看附近活动及优惠信息",
//     hideCancelButton: true,
//     confirmButtonProps: {
//       className: styles["btn"],
//     },
//     onConfirm() {
//       Taro.openSetting();
//     },
//   });
// };

Address.displayName = 'mc-address';
