declare namespace Member {
  /** 会员详情 */
  interface Detail {
    /** 会员卡号 */
    cardNo: string;
    /** 会员当前经验值 */
    currentExperience: number;
    /** 会员当前等级 */
    currentGrade: string;
    /** * 等级有效期开始时间 */
    currentGradeEffectDate: string;
    /** 会员当前等级名称 */
    currentGradeName: string;
    /** 等级有效期结束时间 */
    currentGradeOverdueDate: string;
    /** 会员当前积分 */
    currentPoint: number;
    /** 当前坎级截止积分 */
    endPoint: number;
    /** 上一坎级等级名称 */
    lastGradeName: string;
    /** 当前等级 1：普通会员 2：银卡会员 3：金卡会员 4：铂金会员 5：黑卡会员 */
    level: number;
    /** 还需多少积分到下一坎级 */
    needPoint: string;
    /** 下一坎级等级名称 */
    nextGradeName: string;
    /** 注册来源 */
    registerSource: string;
    /** 当前坎级起始积分 */
    startPoint: number;
  }
  /**
   * 返回值。
   *
   * ActivityPointCountOut
   */
  export interface GradeAndInterests {
    /** 积分数/哈币 */
    currentNum: number;
    /** 用户等级位置 */
    grade: number;
    /** @deprecated 用户等级列表 */
    memberGradeList: Grade[];
    /** 用户等级列表 */
    gradeList: Grade[];
    /** @deprecated 用户权益列表 */
    memberInterestsList: Interest[];
    /** 用户权益列表 */
    interestList: Interest[];
    /** 达到下一等级需要扫码的瓶数 */
    nextGradeNeedScan: number;
    /** 瓶数 */
    scCount: number;
  }

  /**
   * MemberGradeDTO
   */
  export interface Grade {
    /** 主键 */
    id: number;
    /** ext field, 当前等级在轮播图中的索引 */
    index: number;
    /** 是否已经达到该等级 */
    arrived: boolean;
    /** ext field 达成状态的文案 */
    arrivedText: string;
    /** @deprecated 达成条件 */
    arrivedCondition: string;
    /** @deprecated 达成条件描述 */
    arrivedConditionDesc: string;
    /** ext field 等级的描述， 例如：登录注册奖励、开盖扫码1次 */
    desc: string;
    extendAttr: { [key: string]: string };
    /** 等级编码 */
    gradeCode: string;
    /** 图标 */
    icon: string;
    /** @deprecated 拥有的权益编码集合，用逗号隔开 */
    interestsCodes: string;
    /** 拥有的权益 */
    interests: Interest[];
    /** 小程序编码 */
    mpId: string;
    /** 名称 */
    name: string;
  }

  /**
   * MemberInterestsDTO
   */
  export interface Interest {
    createTime: Date;
    creator: string;
    deleted: boolean;
    /** 扩展属性 */
    extendAttr: { [key: string]: string };
    /** 图标 */
    icon: string;
    /** 主键 */
    id: number;
    /** 权益说明 */
    instruction: string;
    /** 权益编码 */
    interestsCode: string;
    /** 小程序编码 */
    mpId: string;
    /** 名称 */
    name: string;
    /** ext field 是否解锁了该权益, 随着等级的解锁而解锁 */
    unlocked: boolean;
    updateTime: Date;
  }
}
