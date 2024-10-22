/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-14 18:25:49
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-22 10:52:22
 * @FilePath: /mc-design/packages/mc-ui/src/hooks/useHomeStore.ts
 * @Description: address 组件的状态数据管理
 */
import Apis from '@/constants/api';
import { create, StateCreator } from 'zustand';
import TaroRequest from '@bud-fe/request/es/taro';

interface IActions {
  setLocation: (params) => void;
  clearAddress: () => void;
  fetchAddressInfo: (params?: CommonEntity.IGetLocationParams) => void;
  init: (params: { request: TaroRequest }) => void;
}

interface IState {
  isMock: boolean;
  location?: CommonEntity.IGetLocationParams;
  address?: CommonEntity.Location;
  phoneModel: boolean;
  request?: TaroRequest;
}

const initialState: IState = {
  isMock: false,
  phoneModel: false,
};

export type TAddressSlice = IState & IActions;

const createAddressSlice: StateCreator<TAddressSlice> = (set, get) => ({
  ...initialState,
  init: (params: { request: TaroRequest }) => {
    set({ request: params.request });
  },
  setLocation: async (params) => {
    set({ location: params });
  },
  fetchAddressInfo: async (params: CommonEntity.IGetLocationParams) => {
    if (!get().request) {
      console.warn('request 未初始化');
      return;
    }
    const request = get().request;
    const result = await request.post(Apis.common.location, params || {}, {}, { showLoading: false }).catch(() => null);
    if (result?.code === 200) {
      set({ address: result.data as CommonEntity.Location });
    }
    console.log('fetchAddressInfo------调用成功');
  },
  clearAddress: () => {
    set({ address: undefined });
  },
});

const logger = (creator: StateCreator<TAddressSlice>) => (set, get, api) =>
  creator(
    (args) => {
      console.log('zustand.address >>> applying', args);
      set(args);
      console.log('zustand.address >>> new state', get());
    },
    get,
    api,
  );

const addressStore = create(logger(createAddressSlice));

/**
 * 初始化地址 store
 * @param config 地址组件状态初始化配置请求实例
 * @returns 地址组件的数据状态
 */
export const useAddress = (config?: { request: TaroRequest }) => {
  if (config) {
    addressStore.getState().init(config);
  }
  return addressStore();
};
