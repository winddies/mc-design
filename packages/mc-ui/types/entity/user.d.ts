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
    interface IUserAnswerParams {
        questionnaireCode: string;
    }
    interface IUserAnswerResp {
        version: string;
        questionnaire: {
            code: string;
            content: string;
            description: string;
            repeatableAnswer: boolean;
            questions: IQuestionsList[];
        };
    }
    interface IQuestionsList {
        code: string;
        content: string;
        description: string;
        imgUrl: string;
        multipleChoiceQuestions: number;
        openQuestions: number;
        patternType: number;
        type: number;
        questionOptions: IQuestionOptionsList[];
        lastAnswerList?: string[];
    }
    interface IQuestionOptionsList {
        code: string;
        content: string;
        description: string;
        imgUrl: string;
    }
    interface IUserGetRegionRsp {
        value: string;
        label: string;
        level: number;
        flag: number;
        parentId: string;
        children: object[];
    }
    interface IUserSaveAnswerParams {
        version?: string;
        questionnaireCode?: string;
        questionAnswers?: IQuestionAnswerList[];
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
        optionCodes: string[];
    }
}
