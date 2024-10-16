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

declare type IEvn = 'dev' | 'test' | 'prod';

declare interface IPageParams {
  currPage?: number;
  pageSize?: number;
  orderBy?: string;
}

declare interface IPageResponse<T> {
  hasNextPage?: boolean;
  list?: T[];
  pageNo?: number;
  pageSize?: number;
  total?: number;
}

declare const wx: any;
declare const BUILD_TIME: string;
declare let Page: Function;
