declare namespace CpeEntity {
  /** UTC码 转 活动码 */
  interface ConversionCode {
    /** 活动编号 */
    activityCode?: string;
    /** 活动类型 */
    activityType?: number;
  }

  /** 活动详情 */
  interface ActivityDetail {
    code: string;
    activityCode?: string; // 为了兼容， 保留
    type: import('@/constants/activity').ActivityType;
    sprType?: string;
    /**
     * 新换购活动下即存在换购机制又存在UTC的情况为0，其他情况为1。
     * 当为0时为新BEES2.0换购，为1时为老BEES2.0换购。
     */
    exchangeOnlyStatus?: 0 | 1;
    /** 活动结束时间 */
    endDate?: Date;
    /** 活动id */
    id?: number;
    legalFileName?: string;
    legalFileUrl?: string;
    /** 活动名称 */
    name?: string;
    /** 活动开始时间 */
    startDate?: Date;
    /** 活动状态 */
    status?: number;
    /** 活动状态名称 */
    statusName?: string;

    beesActivityFlag: boolean;
    /** 暂时根据 beesActivityFlag 的值， 对应 项目中的 DUTCType */
    dutcType?: import('@/constants/activity').DUTCType;
    pocmType?: import('@/constants/activity').PocmType;
    extra?: {
      miraxAppId?: string; // 2023-12-29 开始支持
      miraxOssOrigin?: string; // 2024-08-22 开始支持
      ConfigJson?: string; // 2023-10-31
      configJson?: string; // 2023-10-31 之前
      landingPage?: string;
      pocmType?: string;
      ShareQrCode?: string;
    };
    extendAttr?: {
      ConfigJson?: string;
      ConfigJson2?: string;
      AdvertiseJson?: string;
      ShareQrCode?: string;
    };
    config: ActivityConfig.Entity; // 从 configJson 解析出来的配置
    hasLanding?: boolean;
    hitBetMechanismList?: string[]; // 投注机制
    hitMechanismList?: Mechanism[];
    mechanism?: Mechanism; // 取 hitMechanismList 的第一个

    isMirax?: boolean;
    // mirax?: Mirax;
    latitude?: string;
    longitude?: string;
    sprActivityType?: import('@/constants/activity').SprActivityType;
  }

  // type Mirax = import('@mirax-fe/renderer/lib/api').API.ICreateResourceData;

  interface Mechanism {
    code: string;
    /** 机制类型;1扫码抽奖, 2投注抽奖, 3前置抽奖, 4换购抽奖(普通抽奖) */
    type: number;
    /** 机制开始时间 */
    startDate: string;
    /** 机制开始时间 */
    endDate: string;
    /** 循环状态 */
    loopStatus: number;
    /** 用户参与次数， 累计次数（27） */
    count: number;
    /** 落地页背景图 */
    landBackgroundImg: string;
    /** 活动规则名称 */
    activityRuleTitle: string;
    /** 活动规则文件路径 */
    activityRuleFileUrl: string;
    /** 活动规则文件内容 */
    activityRuleFileContent: string;
    mechanismCode?: string;
    extendAttr: IExtendAttr;
  }

  interface IExtendAttr {
    miraxAppId?: string; // 2023-12-29 开始支持
    // 抽奖结果扩展字段返回处理器
    ExtraHandler: string;
    /** 配置json */
    ConfigJson: string; // 更久之前
    // 连续参与的奖励
    ContinuousJoinPrizeName: string;
    // 1：红包，2：其他
    CoutinuousJoinType: string; // 后端的拼写错误
    /** 1：红包，2：其他 */
    ContinuousJoinType: string; // CoutinuousJoinType
    // 连续参与轮数
    CoutinuousJoinRound: string; // 后端的拼写错误
    /** 总轮数: 3轮 */
    ContinuousJoinRound: string; // CoutinuousJoinRound
    /** 12次/轮 */
    ContinuousJoinCount: string;
    // 多节点
    CoutinuousJoinDetail: string;
    [propsName: string]: string | undefined;
  }
  interface IExtendAttrExt {
    /** 1：红包，2：其他 */
    prizeType: number;
    /** 总轮数 */
    totalRound: number;
    /**
     * 总次数：
     * ContinuousJoinCount = ContinuousJoinRound * 12
     */
    totalCount: number;
    /** 累计参数次数 */
    joinTimes: number;
    /** 单轮参与次数 */
    singleRoundTimes: number;
    /** 单轮参与总次数 = ContinuousJoinCount / ContinuousJoinRound */
    singleRoundCount: number;
    /** 连续参与的奖励 */
    continuousJoinPrizeName: string;

    multiNodePrizeList: MultiNodePrize[];
    /** 多节点奖品名称 (例：168) */
    multiNodePrizeName: string;
  }

  interface MultiNodePrize {
    /** 节点次数 */
    count: number;
    /** 奖励名称 */
    prizeName: string;
    /** 奖品类型 */
    prizeType: number;
  }

  interface ILotteryParams {
    /** activityCode */
    activityCode: string;
    /** 采图路径 */
    captureImgUrl?: string;

    /** 纬度 */
    latitude?: number;
    /** 经度 */
    longitude?: number;

    loginChannel?: number;
  }
  interface IUtcScanLotteryParams extends ILotteryParams {
    /** 扫码渠道 0:微信扫码、1:小程序扫码 */
    loginChannel?: number;
    qrCode: string;
    /** 设备指纹，前端传,通过同盾sdk生成 */
    tokenId?: string;
  }
  interface IUtcBetLotteryParams extends ILotteryParams {
    /** 投注物;1积分2碎片 */
    betItem: number;
    /** 投注数量 */
    betNum: number;
    /** type */
    type: number;
  }

  interface IUtcStoreLotteryParams extends ILotteryParams {
    /** middleId */
    middleId?: string;
    /** 售点id */
    pocId?: string;
  }

  /**
   * 抽奖结果
   */
  interface BaseLotteryResult {
    // 中奖结果
    lotteryResponse?: LotteryResponse;
    // 风控结果
    riskResponse?: RiskResponse;
  }

  interface LotteryResponse {
    activityCode?: string;
    betPlayType?: number;
    extra?: { [key: string]: string };
    joinCode?: string;
    luckyCredentialCode?: string;
    mechanismCode?: string;
    mechanismJoinCount?: number;
    multipleCredentialCode?: string;
    prizeList?: Prize[];
    prizePerType?: number;
    cardPwd?: string;
    cardPwdRound?: string;
  }

  interface Prize {
    /** 是否可选择 */
    canChoice?: boolean;
    /** 资格码 */
    code?: string;
    /** 卡券项目id */
    couponProjectId?: string;
    /** 领奖资格码 */
    credentialCode?: string;
    /** 奖品编号 */
    prizeCode?: string;
    /** 奖品名称 */
    prizeName?: string;
    /** 奖品数量 */
    prizeNum?: number;
    /** 奖品图片 */
    prizePicture?: string;
    /** 奖品价值 */
    prizePrice?: number;
    /** 领取方式;实物奖- 1邮寄 2短信 3现场领取 */
    receiveType?: number;
    /** 储值金状态 0否1是 */
    savingStatus?: number;
    /** 储值金提现门槛 单位元 */
    savingWithdrawalThreshold?: number;
    /** 奖品子类型;21 普通红包  金额固定 22 随机红包  金额区间 23 投注筹码  固定/随机 种类 24 兑换券/优惠券 */
    subType?: number;
    /** 奖品类型;1. 实物奖 2. 虚拟奖 */
    type?: number;
    specialType?: number;

    /** 特殊情况下的真实活动code, 需要和后续链路关联 */
    couponProjectActivityCode?: string;

    hbList?: Prize[];
    extendAttr: {
      [props: string]: any;
    };
  }

  /**
   * Risk
   */
  interface RiskResponse {
    /** 需要返回给前端的信息 */
    message?: string;
    /** 风控状态 1 不通过 2 需要后续步骤 3 通过 */
    riskStatus?: number;
  }

  /**
   * 后续步骤枚举： CAPTURE采集图片
   */
  export enum RiskNextStep {
    Capture = 'CAPTURE',
  }

  interface ActivityRule {
    content?: string;
    fileUrl?: string;
    title?: string;
  }

  /**
   * ActivityLotteryRecordPageIn
   */
  interface RecordPageParams extends IPageParams {
    activityCodeList?: string[];
    prizeTypeList?: string[];
    prizeSubTypeList?: number[];
    total?: number;
  }

  /**
   * RecordPageResponse
   */
  interface LotteryRecord {
    /** 活动编号 */
    activityCode?: string;
    /** 前置红包状态 1-是 */
    advanceStatus?: string;
    /** 资格编号 */
    code?: string;
    /** 创建时间 */
    createTime?: string;
    /** 奖品领取状态（0-待领取 1-已领取) */
    distributeStatus?: number;
    /** 前置奖品激活状态;0未激活  1 已激活 */
    effectiveStatus?: number;
    /** 是否已填写邮寄地址标志 */
    expressAddrRecorded?: string;
    /** 扩展属性 */
    extendAttr?: { [key: string]: string };
    /** 中奖记录id */
    id?: number;
    /** 参与记录 */
    joinCode?: string;
    /** cpe-prize中奖返回的图片 */
    lotteryPicture?: string;
    /** 机制编号 */
    mechanismCode?: string;
    /** 机制结束时间 */
    mechanismEndDate?: Date;
    /** 奖品编号 */
    prizeCode?: string;
    /** 奖品id */
    prizeId?: string;
    /** 奖品名称 */
    prizeName?: string;
    /** 奖品数量 */
    prizeNum?: number;
    /** 奖品图片 */
    prizePicture?: string;
    /** 奖品价值 */
    prizePrice?: number;
    /** 奖品领取方式 1邮寄 2短信 3现场领取 */
    prizeReceiveType?: number;
    /** 奖品子类型 21 普通红包  金额固定 22 随机红包  金额区间 23 投注筹码  固定/随机 种类 24 兑换券/优惠券 25瓜分红包 26 虚拟卡券 27 其他 */
    prizeSubType?: number;
    /** 奖品类型 1. 实物奖  2. 虚拟奖 */
    prizeType?: number;
    /** 中奖记录中奖品图片 */
    recordPrizePicture?: string;
    /** 前端响应的特殊类型 用于弹窗 1球员卡，2微信红包封面 3可预约活动 */
    specialType?: number;
    /** 状态1未激活2未发放3发放中4已发放5发放失败（生产不会发放失败） 999 已过期（/prize/coupon/record 这个接口会重新赋值999） */
    status?: number;
    /** 用户编号 */
    userCode?: string;
    /** 快递单号 */
    waybillNo?: string;
  }

  /**
   * 三方券信息入参
   */
  interface CouponInfoParams {
    activityCode: string;
    /** 奖品记录code */
    code: string;
  }
  /**
   * 三方券信息
   */
  interface CouponRecord {
    cardNo: string;
    cardPwd: string;
    effectveStartDate?: string;
    effectveEndDate?: string;
    userRule?: string;
  }

  /**
   * 保存邮寄地址入参
   */
  interface saveReceiveInfoParams {
    activityCode?: string;
    code?: string; // 资格编号
    address?: string; // 详细地址
    receiveName?: string; // 收件人姓名
    receivePhone?: string; // 收件人手机号
  }

  /**
   * 邮寄地址
   */
  interface ReceiveInfo {
    code?: string; // 资格编号
    receiveAddress?: string; // 收件人地址
    receiveName?: string; // 收件人姓名
    receivePhone?: string; // 收件人手机号
  }
  /**
   * 查询邮寄地址入参
   */
  interface getReceiveInfoParams {
    activityCode?: string;
    code?: string; // 资格编号
    userCode?: string; // 用户编号
  }

  interface IPublicListItem {
    lotteryTime: string;
    phone: string;
    prizeName: string;
  }

  interface IUnionQrcodeScanResp {
    codeActivityResponse: {
      activityCode: string;
      activityType: number;
      beesActivityFlag: boolean;
      beesActivityStatus: number;
      extendAttr: Record<string, any>;
    };
    customQrcodeResponse: {
      configJson: string;
    };
    pgResponse: {
      activityCode: number;
      activityId: number;
      extendAttr: Record<string, any>;
      locLatitude: string;
      locLongitude: string;
      pocAddress: string;
      url: string;
    };
    pocResponse: {
      activityId: string;
      address: string;
      brandCode: string;
      city: string;
      distance: number;
      distanceDesc: string;
      latitude: string;
      longitude: string;
      pocId: string;
      pocMiddleId: string;
      shopName: string;
      status: number;
    };
    sprActivityResponse: {
      actCode: string;
      extendAttr: Record<string, any>;
      latitude: number;
      longitude: number;
    };
    type: number;
  }
}
