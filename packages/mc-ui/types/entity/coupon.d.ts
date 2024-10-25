declare namespace CouponEntity {
    /**
     * CouponListIn，获取卡劵列表入参
     */
    interface CouponParams {
        /**
         * 1(待使用) 2(已使用) 3(已失效)
         */
        couponStatus?: number;
    }
    /**
     * CouponResponse，卡劵列表返参
     */
    interface CouponResponse {
        checked: boolean;
        /**
         * cpe活动Code
         */
        activityCode?: string;
        /**
         * 背景图片
         */
        backgroundImg?: string;
        /**
         * 劵码
         */
        couponCode?: string;
        /**
         * 优惠劵颜色
         */
        couponColor?: string;
        /**
         * 优惠劵图片
         */
        couponImg?: string;
        /**
         * 优惠劵名称
         */
        couponName?: string;
        /**
         * 生效时间
         */
        effectiveTime?: string;
        /**
         * 兑换门店
         */
        exchangeShop?: string;
        /**
         * 兑换时间
         */
        exchangeTime?: string;
        /**
         * 有效期截止时间/失效时间
         */
        expiredTime?: string;
        /**
         * 扩展属性
         */
        extendAttr?: {
            [key: string]: string;
        };
        /**
         * 发放时间时间
         */
        grantTime?: string;
        /**
         * 表示id
         */
        id?: string;
        /**
         * 会员Id
         */
        memberId?: string;
        /**
         * 会员类型
         */
        memberType?: string;
        /**
         * 售点id
         */
        pocId?: string;
        /**
         * 售点pocMiddleId
         */
        pocMiddleId?: string;
        /**
         * 优惠劵项目id
         */
        projectId?: string;
        /**
         * 卡券状态。1(待使用) 2(已使用) 3(已失效)
         */
        status: string;
        unionExchangeGroup?: number;
    }
    /**
     * CouponExchangeShopIn，卡券可兑换门店入参
     */
    interface IStoreListParams {
        /**
         * 活动Code
         */
        activityCode?: string;
        /**
         * 当前页
         */
        currPage?: number;
        /**
         * 纬度
         */
        latitude?: number | string;
        /**
         * 经度
         */
        longitude?: number | string;
        /**
         * 每页记录条数
         */
        pageSize?: number;
    }
    interface IStoreResponse {
        list?: IStoreItem[];
        pageNo?: number;
        pageSize?: number;
        total?: number;
    }
    interface IStoreItem {
        /**
         * 门店地址
         */
        address?: string;
        /**
         * 距离
         */
        distance?: string;
        /**
         * 纬度
         */
        latitude?: string;
        /**
         * 经度
         */
        longitude?: string;
        /**
         * 门店pocId
         */
        pocId?: string;
        /**
         * 门店pocMiddleId
         */
        pocMiddleId?: string;
        /**
         * 门店名称
         */
        shopName?: string;
    }
}
