export const enum ERROR_CODE {
  /** IP转经纬度失败 */
  // {code: 50011, data: null, message: "IP解析异常", timestamp: 1698417509099}
  IP_INVERSE_ERROR = 50011,
  RECEIVED_COUPON = 10011631,
}
// 活动承接页背景图
export const HOME_BG = 'https://front-static-c.ab-inbev.cn/brand/20240410/landing-bg@2x.png';

export const ACTIVITY_PAGE = {
  HOME: '/pages/activity/home/index',
  LANDING: '/pages/activity/landing/index',
  BANNER_LANDING: '/pages/activity/banner-landing/index',
  MAIN: '/pages/activity/main/index',
  LUCK: '/pages/activity/luck/index',
  REGRET: '/pages/activity/regret/index',
  // NOTE 对于换购活动，新增failed页面，等同于regret页面
  FAILED: '/pages/activity/failed/index',
  NEARBY: '/pages/activity/nearby/index',
  LANDING_LOCATION: '/pages/landing/index', // 目前适用于spr强地理位置授权
};

export const SUMMER_BET_ACTIVITY_PAGE = {
  LANDING: '/pages/summer-bet/landing/index',
  LANDING_MALL_REDEEM: '/pages/summer-bet/landing-mall-redeem/index',
  LANDING_MALL_UTC: '/pages/summer-bet/landing-mall-utc/index',
  MAIN: '/pages/summer-bet/points-mall/index',
  PLUGIN_MAIN: 'plugin://hrb-24-summer/index',
};

export const SUMMER_BET_ACTIVITY_TYPE = {
  REDEEM: 1,
  UTC: 2,
};

// CPE活动类型
export const enum ActivityType {
  DUTC = 1, // UTC活动
  Quality = 2, // 品质活动
  SPR = 3, // SPR活动
  Normal = 4, // 普通活动
  BEES_COUPON = 5, // BEES换购活动
  POCM = 6, // 定额赠酒
  Default = -1, // 默认活动 业务中不会存在这个活动类型，只是为了兼容Activity.Type不存在的情况
}

export const enum PocmType {
  REDEEM = 1, // 换购
  POCM = 2,
}

export const enum DUTCType {
  LOTTERY = 1, // 抽红包
  REDEEM = 2, // 换购
}

// 机制类型; 1 扫码抽奖, 2 投注抽奖, 3 前置抽奖, 4 换购抽奖(普通抽奖) 6 pocm
export const enum MechanismType {
  SCAN = 1, // 扫码抽奖
  BET = 2, // 投注抽奖
  STORE = 3, // 前置抽奖
  REDEEM = 4, // 换购抽奖(普通抽奖)
  BEES = 5, // bees抽奖
  POCM = 6, // 定额赠酒
  FISSION = 7, // 邀请好友
}

// 奖品类型; 1 实物奖品, 2 虚拟奖品
export const enum PrizeType {
  REAL = 1, // 实物奖品
  VIRTUAL = 2, // 虚拟奖品
}
// 奖品子类型; 21 普通红包 金额固定 22 随机红包 金额区间 23 投注筹码 固定/随机 种类 24 兑换券/优惠券 25 瓜分红包 26 虚拟卡劵 27 其他
export const enum PrizeSubType {
  PHYSICAL = 1, // 实物奖
  PPG = 11, // PPG
  FREE_BEER = 12, // 免费酒
  NORMAL = 21, // 普通红包 金额固定
  RANDOM = 22, // 随机红包 金额区间
  CHIP = 23, // 投注筹码 固定/随机 种类
  COUPON = 24, // 兑换券/优惠券
  CARVE_UP = 25, // 瓜分红包
  VIRTUAL_CARD = 26, // 虚拟卡券
  OTHER = 27, // 其他
}

export const enum RiskStatus {
  REJECT = 1, // 不通过
  CAPTURE = 2, // 需要采图
  RESOLVE = 3, // 通过
}

// eslint-disable-next-line no-useless-escape
export const STRING_WITH_VAR_REG = /{[a-zA-Z0-9\[\].]{1,}}{1,}/;
export const enum PrizeReceiveType {
  SEND_BY_POST = 1,
  SMS = 2,
  PICK_UP_ON_SITE = 3,
  PICK_UP_ONLINE = 4,
}

export const ExchangeStatus = {
  Old: 1,
  New: 0,
};

export const enum SprActivityType {
  H5 = 'H5', // 进H5
  SprLottery = 'SprLottery', // 纯spr抽奖活动
}
