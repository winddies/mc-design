/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-23 16:08:05
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-24 22:56:47
 * @FilePath: /mc-design/apps/demo/types/global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="@tarojs/taro" />
/// <reference types="@taro-hooks/plugin-react" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
  }
}

declare module 'react' {
  interface CSSProperties {
    [key: string]: any;
    '--mc-button-default-bg-color'?: string;
    // 添加其他自定义属性...
  }
}

declare const wx: any;
declare const BUILD_TIME: string;
