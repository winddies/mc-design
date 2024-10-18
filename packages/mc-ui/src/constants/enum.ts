export const enum ERROR_CODE {
  /** IP转经纬度失败 */
  // {code: 50011, data: null, message: "IP解析异常", timestamp: 1698417509099}
  IP_INVERSE_ERROR = 50011,
}

/** wgs84 返回 gps 坐标， gcj02 返回可用于 Taro.openLocation 的坐标 */
export const enum LocationType {
  WGS84 = 'wgs84',
  GCJ02 = 'gcj02',
}

export const enum CarouseInfoCode {
  HOME_SWIPER_LIST = 'HOME_SWIPER_LIST',
  HOME_POSTER_LIST = 'HOME_POSTER_LIST',
  HOME_ICON_AD = 'AD',
  ACTIVITY_LIST = 'ACTIVITY_LIST',
  ACTIVITY_AD = 'ACTIVITY_AD',
}

export const enum JumpType {
  MINI_PROGRAM_URl = 1,
  WEB_VIEW_PAGE = 2,
  INNER_PAGE = 3,
}

export const enum LS_KEY {
  USER_INFO = 'USER_INFO',
}

export const enum ScanQrCodeType {
  /** 活动码： 会进入 Activity 链路 */
  ACTIVITY_CODE = 1,
  /** 门店码： 会进入 「卡券选择页 coupon-choose」 */
  STORE_CODE = 2,
  /**
   * 静态码： 根据配置中的地址跳转, 如：
   * 1、 法文码（type == 1）: 进入 活动规则
   * 2、 Marketing活动(type === 2): 进入 后续活动链路
   */
  CPE_RULE_CODE = 3,
  SPR_CODE = 4,
}

export const enum DistributeStatus {
  NOT_COLLECTED = 0,
  RECEIVED = 1,
}

export const enum RECORD_TYPE {
  CASH = 1,
  CouponExchange,
  CouponDiscount,
  GIFT,
}
