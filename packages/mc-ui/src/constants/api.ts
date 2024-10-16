export default {
  common: {
    // 获取地理位置（如果经纬度为空，则根据ip获取）
    location: "/basicAbility/getLocation",
    // 获取隐私政策信息
    privacy: "/mp/getPrivacyPolicy",
    // 码类别检查
    "qr-code-check": "/mp/unionQrcodeScan",
    // 同盾
    "tong-dun": "/tongDunController/getTongDunData",
    // 获取轮播图列表
    "carousel-list": "/carousel/getCarouselInfo",
    "red-cover-url": "/mp/red/cover",
    // 获取广告信息
    "advertise-info": "/advertise/getAdvertiseInfo",
  },
  user: {
    // 注册
    register: "/user/register",
    // 用户详情
    detail: "/user/getDetails",
    // 修改用户信息
    update: "/user/updateUserInfo",
    // 上传头像
    "upload-avatar": "/user/upLoadHeadImgUrl",
    // 拒绝地理位置授权
    "refused-get-location": "/user/refusedGetLocation",
    "authorize-privacy": "/user/authorizePrivacy",
    "refuse-privacy": "/privacyRecordRefusedController/save",

    // 省市区数据级联查询接口
    getRegion: "/user/getRegion",
    // 调查问卷
    questionnaire: "/user/questionnaire",
    // 提交问卷
    saveUserAnswer: "/user/saveUserAnswer",
    getLastUserAnswer: "/user/getLastUserAnswer",
    // 获取用户积分 & 扫码次数
    getActivityPoint: "/user/my/activityPointCount",
    // 现金红包
    "prize-record": "/user/prize/record",
    // 我的礼品
    gift: "/user/my/gift",
  },
  // activity: {
  //   // 获取活动列表
  //   list: '/activity/list',
  //   // 获取活动详情
  //   detail: '/activity/getActivityInfo',
  //   // 获取活动类型列表
  //   'type-list': '/activity/getTypeList',
  //   // 获取活动地区列表
  //   'area-list': '/activity/getAreaList',
  // },
  // 'activity-session': {
  //   // 预约场次
  //   'do-book': '/activitySession/book',
  //   // 取消预约
  //   'cancel-book': '/activitySession/cancelBooking',
  //   // 获取我的预约列表
  //   'my-book': '/activitySession/getMyBooking',
  //   // 获取场次列表
  //   list: '/activitySession/getSessionList',
  //   // 获取场次详情
  //   get: '/activitySession/getSessionInfo',
  //   // 场次匹配
  //   match: '/activitySession/matchSession',
  //   // 签到
  //   sign: '/activitySession/sign',
  // },
  coupon: {
    // 获取优惠券列表
    list: "/coupon/listByStatus",
    // 获取优惠券详情
    detail: "/coupon/details",
    // 获取优惠券门店列表
    "shop-list": "/coupon/couponExchangeShopList",
    // 门店支持兑换，且该消费者待兑换的活动卡券
    "can-use-list": "/coupon/shopExchangeCoupon",
    // 兑换优惠券
    use: "/coupon/useCoupon",
    // 获取第三方券信息
    "coupon-detail": "/coupon/couponPWD",
  },
  cpe: {
    // 获取活动详情
    detail: "/cpeActivity/getActivityDetail",
    // 获取基础活动详情
    "basic-detail": "/cpeActivity/getBasicActivityDetail",
    // 获取活动规则列表
    "rules-list": "/cpeActivity/getActivityRuleList",
    // 风控采图
    "risk-control": "/cpeActivity/captureImg",
    // 扫码上报
    "scan-report": "/cpeActivity/codeReport",
    // 根据IQMS码换取CPE活动码
    "code-conversion": "/cpeActivity/conversionCode",
    // 抽奖
    lottery: {
      // 投注抽奖
      bet: "/cpeActivity/bet",
      // 普通抽奖
      ordinary: "/cpeActivity/ordinary/lottery",
      // 门店前置抽奖
      store: "/cpeActivity/market/scan",
      // UTC扫码抽奖
      scan: "/cpeActivity/scan",
      sprLottery: "/cpeActivity/sprLottery",

      // 再拼一次
      "lucky-again": "/cpeActivity/lucky/again",
      // 拼一拼确认
      "lucky-confirm": "/cpeActivity/lucky/confirm",
    },
    // 获取中奖记录分页接口
    records: "/cpeActivity/record/page",

    // 保存邮寄地址
    receive: "/cpeActivity/receive/sync",
    // 获取邮寄地址详情
    "receive-detail": "/cpeActivity/receive/detail",
    // bess新换购活动扫码访问nearby页次数统计
    "nearby-count": "/cpeActivity/exchange/toc/scan",
    // 中奖公示
    "lottery-public": "/cpeActivity/record/carousel",

    couponDetail: "/coupon/couponDetailInfo",

    "get-activity-code": "/coupon/getActivityCode",

    "get-activity-code-v2": "/coupon/getActivityCodeV2",
  },

  pointExchange: {
    // 获取积分商品列表
    list: "/pointExchange/list",
    // 获取积分商品详情
    detail: "/pointExchange/detail",
    // 积分商品兑换
    exchange: "/pointExchange/doExchange",
    // 获取积分规则
    "get-mp-attr": "/mp/getMpAttr",
  },
};
