declare namespace UserEntity {
  interface UserDetail {
    /** 出生日期 MM-dd */
    birthDay?: string;
    /** 出生年份 yyyy */
    birthYear?: string;
    /** 卡券数量 默认 0 */
    couponSum?: number;
    /** 会员当前经验值 */
    currentExperience?: number;
    /** 会员当前等级 */
    currentGrade?: string;
    /** 等级有效期开始时间 */
    currentGradeEffectDate?: string;
    /** 会员当前等级名称 */
    currentGradeName?: string;
    /** 等级有效期结束时间 */
    currentGradeOverdueDate?: string;
    /** 会员当前积分 -勋章数 */
    currentPoint?: number;
    /** 当前坎级截止积分 */
    endPoint?: number;
    /** 性别 F:女 M:男 O:未知 */
    gender?: string;
    /** 用户头像 */
    headImgUrl?: string;
    /** 上一坎级等级名称 */
    lastGradeName?: string;
    /** 当前等级 1：普通会员 2：银卡会员 3：金卡会员 4：铂金会员 5：黑卡会员 */
    level?: number;
    /** 会员名称 */
    memberName?: string;
    /** 手机号码 */
    mobile?: string;
    /** 还需多少积分到下一坎级 */
    needPoint?: string;
    /** 下一坎级等级名称 */
    nextGradeName?: string;
    /** 昵称 */
    nickName?: string;
    /** openId */
    openId?: string;
    /** 当前坎级起始积分 */
    startPoint?: number;
    /** unionId */
    unionId?: string;
    /** userCode of cpe */
    userCode?: string;
    /** 是否授权了最新的隐私政策 */
    wasAuthorizedLastPrivacy?: boolean;
    /** 是否已经授权了手机号码 */
    wasGetPhoneNumber?: boolean;
    /** 是否拒绝过地理位置授权 */
    wasRefusedGetLocation?: boolean;
    /** 是否会员 */
    wasRegister?: boolean;
  }

  // 调查问卷
  interface IUserAnswerParams {
    questionnaireCode: string; //	问卷编码
  }
  // 问卷列表
  interface IUserAnswerResp {
    version: string; //	问卷编码
    questionnaire: {
      // 问卷数据。
      code: string; //	问卷编码。UUID格式且全局唯一
      content: string; //	问卷文本
      description: string; //	问卷描述。
      repeatableAnswer: boolean; //	是否可重复答题。0=否、1=是
      questions: IQuestionsList[]; //	问题选项数据
    };
  }
  interface IQuestionsList {
    code: string; // 问题编码，UUID格式且全局唯一。
    content: string; // 问题文本
    description: string; // 问题描述。
    imgUrl: string; // 问题图片URL
    multipleChoiceQuestions: number; // 多选题答案长度
    openQuestions: number; //	开放题答案输入长度
    patternType: number; // 显示样式类型。1=普通、2=下拉、3=排序。
    type: number; // 问题类型。1=单选题、2=多选题 3=文本框4=省市区。
    questionOptions: IQuestionOptionsList[];
    lastAnswerList?: string[];
  }
  interface IQuestionOptionsList {
    code: string; // 问题编码，UUID格式且全局唯一。
    content: string; // 问题文本
    description: string; // 问题描述。
    imgUrl: string; // 问题图片URL
  }
  //   省市区
  interface IUserGetRegionRsp {
    value: string; //	行政编码
    label: string; //  名称
    level: number; // 层级
    flag: number; // 是否人工调整，0，否，1，是
    parentId: string; // 上级行政编码
    children: object[];
  }
  // 提交问卷
  interface IUserSaveAnswerParams {
    version?: string; //	问卷版本
    questionnaireCode?: string; //	问卷编码
    questionAnswers?: IQuestionAnswerList[]; //	问题回答结果列表。
  }
  interface IQuestionAnswerList {
    questionCode: string;
    regionData?: {
      provinceName: string;
      provinceCode: string;
      cityName: string;
      cityCode: string;
      districtName: string;
      districtCode: string;
    };
    optionCodes: string[]; //	选择选项编码列表。
  }
}
