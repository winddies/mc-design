/* eslint-disable max-lines */
declare namespace ActivityConfig {
  type ImageUrl = `https://front-static-c.ab-inbev.cn/${string}`;
  type Size = [number | string, number | string];

  /**
   * 抽奖类型
   * bet: 投注抽奖
   * ordinary: 普通抽奖
   * store: 门店前置抽奖
   * scan: UTC扫码抽奖
   * lucky: 拼一拼手气
   */
  type LotteryType = 'bet' | 'ordinary' | 'store' | 'scan' | 'lucky';

  interface IConditionsDataItem {
    [propsName: string]: any;
    operator: 'equal' | 'moreThan' | 'lessThan' | 'moreThanOrEqual' | 'lessThanOrEqual' | 'in';
    next?: IConditionsDataItem;
  }

  type DeepOptional<T> = {
    [P in keyof T]?: DeepOptional<T[P]>;
  };

  interface Entity {
    code?: string; // 活动code， 唯一标识
    name?: string; // 活动名称
    background?: ImageUrl; // 活动背景图

    pages: {
      // 属于 banner 进入的 landing 页面配置
      shareInfo?: {
        cover: string;
        title: string;
      };
      bannerLanding?: ILandingPage;
      landing?: ILandingPage; // 落地页
      main?: IMainPage; // 活动主页
      luck?: ILuckPage; // 中奖成功页
      regret?: IRegretPage; // 中奖失败页
      nearby?: INearbyPage; // 附近门店页
      'coupon-choose'?: ICouponChoosePage; //
      'coupon-use'?: ICouponUsePage; // 优惠券领取页
      failed?: IFailedPage; // 抽奖失败页
    };
    conditions?: Array<{
      data: IConditionsDataItem[];
      pages: DeepOptional<Entity['pages']>;
    }>;
  }

  type TPageType = keyof Entity['pages'];

  interface IPoint {
    x: number | string;
    y: number | string;
  }

  // 形变参数
  interface ITransform {
    translate?: Partial<IPoint>; // 偏移量
    scale?: number; // 缩放比例
    rotate?: number; // 旋转角度
  }

  // 图形按钮
  interface IButton extends ITransform {
    isScan?: boolean;
    name?: string;
    text?: string;
    background?: ImageUrl;
    size?: [number, number];
    navigator?: INavigator;
    style?: import('react').CSSProperties;
    unlock?: IButton;
    exist?: boolean; // 是否存在, default true
    show?: boolean;
    disabled?: boolean;
    disabledToast?: string;
  }

  interface ITrigger {
    // 自动触发
    mode: 'manual' | 'auto'; // default `manual`
    //
    condition?: {
      // 触发条件
      type: 'onPageLoad' | 'onFetchResolve' | 'onFetchReject'; // default `onPageLoad`
      url: '';
    };
  }

  interface IPopup {
    size?: [number, number];
    background?: ImageUrl;
    close?: IButton & {
      isCustom?: boolean;
    };
    title?: IButton;
    buttons?: IButton[];
    trigger?: ITrigger;
    style?: import('react').CSSProperties;
  }

  type TNavigatorType = 'popup' | 'link';
  interface INavigator {
    type?: TNavigatorType; // 按钮类型 default link
    target?: string; // 跳转目标
    // popup?: IPopup;
  }

  interface IBanner {
    size?: [number, number];
    background?: ImageUrl;
    transform?: ITransform;
    style?: import('react').CSSProperties;
  }

  interface ITextStyle {
    text?: string | number;
    background?: ImageUrl;
    style?: import('react').CSSProperties;
    field?: string;
    animation?: IAnimation;
  }

  interface IText {
    background?: ImageUrl;
    textType?: 'default' | 'single' | 'bgText';
    text?: string;
    style?: import('react').CSSProperties;
    extra?: {
      background?: ImageUrl;
      size?: Size;
      style?: import('react').CSSProperties;
    };
  }

  type ITextType = IText & {
    textConfig?: {
      [key: string]: ITextStyle;
    };
  };

  type IBannerType = IBanner & {
    textLists?: ITextType[];
    animationType?: 'shake';
    // animationConfig?: import('rc-tween-one').IAnimProps;
  };

  interface IReacordPopup {
    style?: import('react').CSSProperties;
    background?: ImageUrl;
    buttons?: IButton[];
    context?: IBannerType | IBannerType[];
    isClock?: boolean;
  }

  interface IShopCouponInfo {
    // 店铺名称
    shopName?: string;
    // 兑换时间
    useCouponTime?: string;
    // 兑换数量
    useCouponNum?: number;
    // 当前projectId剩余数量
    couponResidueNum?: number;
    // 使用卡券总额
    couponPrize?: string;
  }

  type IShoulderPosition = 'top' | 'top-left' | 'top-right' | 'center-left' | 'center-right';

  /**
   * 页面基础配置
   */
  interface IPageConfig<TElement extends string> {
    background?: ImageUrl;
    logo?: {
      background?: ImageUrl;
      size?: [number, number];
      transform?: ITransform;
    }; // 页面中的活动logo
    navigationBarMode?: 'dark' | 'light';
    layout?: {
      shoulder?: [TElement | undefined, TElement | undefined]; // 肩膀
      shoulderJustifyContent?: 'start' | 'end';
      shoulderStyle?: import('react').CSSProperties;
      // shoulderPosition: IShoulderPosition; // 肩膀位置
      footer?: TElement[]; // 底部
      footerDirection?: 'row' | 'column'; // default column
    };
    buttons?: {
      [key in TElement]?: IButton;
    };
    popups?: {
      [key in TPageType]?: IPopup;
    };
    policy?: {
      effects: TElement[];
      policyText?: string; // 百威隐私政策 文字
      background?: ImageUrl;
      text?: string; // 我已阅读本次活动详细规则
      tip?: string; // 本次活动详细规则

      size?: [number, number];
      checkbox?: {
        icon?: {
          color: 'white' | 'brown' | 'yellow' | 'blue' | 'summer-hrb-1900' | 'summer-hrb-xiaomaiwang';
        };
        text?: {
          color: string;
        };
        link?: {
          color: string;
        };
      };
      textStyle?: import('react').CSSProperties;
      policyStyle?: import('react').CSSProperties;
      style?: import('react').CSSProperties;
    } & ITransform;
    tipsPopupConfig?: ITipsPopupConfig;
    movableBtnWrapperStyle?: import('react').CSSProperties;
    movableBtnConfig?: {
      [key in string]?: {
        aplusConfig?: any;
        style?: import('react').CSSProperties;
        button: IButton;
        direction?: 'none' | 'horizontal' | 'all' | 'vertical';
        x?: number | 'left' | 'right';
        y?: number | 'top' | 'bottom';
        changePosition: {
          x?: number | 'left' | 'right';
          y?: number | 'top' | 'bottom';
        };
        jumpType?: 'h5' | 'popup' | 'page';
        navigator?: string;
      };
    };
  }
  // =====================
  // 落地页元素：隐私政策、活动规则、中奖记录、扫码按钮、立即参与
  type TLandingPageElement = 'rule' | 'join' | 'scan' | 'records' | 'records-btn' | 'share';
  interface ILotteryProgress extends ITransform {
    titleStyle?: import('react').CSSProperties;
    contentStyle?: import('react').CSSProperties;
    progressStyle?: import('react').CSSProperties;
    countStyle?: import('react').CSSProperties;
    wrapperStyle?: import('react').CSSProperties;
    padding?: {
      top?: number | string;
      right?: number | string;
      bottom?: number | string;
      left?: number | string;
    };
    title: IButton & {
      textConfig?: {
        [key: string]: ITextStyle;
      };
      position?: 'top' | 'bottom'; // default top
    };
    background?: ImageUrl;
    trick?: IButton & {
      piece: IButton;
      thumb?: IButton;
    };
    size?: [number, number];
    start?: IButton;
    end?: IButton;
    nodes?: Array<{
      background?: ImageUrl;
      size?: [number, number];
    }>;
    text?: string;
    bottom?: {
      arrow?: {
        background: ImageUrl;
        size: [number, number];
      };
      text?: {
        value: string;
        style?: import('react').CSSProperties;
      };
    };
  }
  /**
   * 落地页
   */
  type ILandingPage = IPageConfig<TLandingPageElement> & {};
  // =====================
  // 落地页元素：活动规则、中奖记录、扫码按钮
  type TMainPageElement = 'rule' | 'records' | 'scan' | 'bet';
  interface TMainPagePopup extends IPopup {
    animationBgList?: IAnimation[];
    animationPopup?: IAnimation;

    prize?: {
      name: string;
      image: IButton;
      showCount?: boolean;
      background?: ImageUrl;
      style?: import('react').CSSProperties;
      tips?: string;
      prizeTips?: string;
      nameStyle?: import('react').CSSProperties;
      textStyle?: import('react').CSSProperties;
      textConfig?: {
        [key: string]: import('react').CSSProperties;
      };
    };
    button?: (IButton & { isScan?: boolean; isCopy?: boolean }) | IButton[];
    multiBackground?: ImageUrl[];
    tip?: IButton & {
      prizeStyle?: import('react').CSSProperties;
      animation?: IAnimation;
      countStyle?: import('react').CSSProperties;
    } & {
      textConfig?: {
        [key: string]: ITextStyle;
      };
    };
  }

  interface IAnimation {
    animationType?: string;
    // animationConfig?: import('rc-tween-one').IAnimProps;
  }

  interface ILuckPopupConfig {
    title?: string;
    content?: string;
    button?: IButton;
    background?: ImageUrl;
    size?: [number, number];
    popupStyle?: import('react').CSSProperties;
    popupTitleStyle?: import('react').CSSProperties;
    popupContentStyle?: import('react').CSSProperties;
    labelList?: string[];
    labelStyle?: import('react').CSSProperties;
    luckList?: Array<{
      rowKey?: string;
      style?: import('react').CSSProperties;
    }>;
  }

  interface ITipsPopupConfig {
    title?: string;
    content?: string;
    button?: IButton;
    background?: ImageUrl;
    size?: [number, number];
    popupClose?: {
      background?: ImageUrl;
      size?: [number, number];
      style?: import('react').CSSProperties;
    };
    popupStyle?: import('react').CSSProperties;
    popupTitleStyle?: import('react').CSSProperties;
    popupContentStyle?: import('react').CSSProperties;
    scroll?: {
      title?: string;
      content?: string;
      style?: import('react').CSSProperties;
      titleStyle?: import('react').CSSProperties;
      textStyle?: import('react').CSSProperties;
      contentStyle?: import('react').CSSProperties;
      scrollbarStyle?: import('react').CSSProperties;
      scrollbarThumbStyle?: import('react').CSSProperties;
    };
  }

  /**
   * 活动主页
   */
  type BaseMainPage = IPageConfig<TMainPageElement> &
    Partial<{
      progress?: ILotteryProgress;
      popup: IPopup;
      isMultiNode?: boolean;
      isKeepProgress?: boolean;
      isRedEnvelopeContinuous?: boolean;
      unlockBackground?: ImageUrl;
      nbaConfig?: {
        buttonDisabeld?: boolean;
        buttonDisabledToast?: string;
        link?: string;
      };
      luckPopupConfig?: ILuckPopupConfig;
    }>;

  interface BasePopItem {
    background?: string;
    size?: [number, number];
    style?: import('react').CSSProperties;
  }
  interface PopTextConfig {
    text?: string;
    textConfig?: {
      [propsName: string]: {
        text?: string;
        field?: string;
        style?: import('react').CSSProperties;
        animation?: any;
      };
    };
  }
  interface IPopButton {
    action?: 'scan' | 'link' | 'lock' | 'copy';
    link?: string;
    name?: string;
    text?: string;
    background?: ImageUrl;
    size?: [number, number];
    navigator?: INavigator;
    style?: import('react').CSSProperties;
    translate?: { x?: string; y?: string };
  }
  interface IPopV2Config {
    tip?: (BasePopItem & PopTextConfig) | null;
    prizeName?: BasePopItem &
      PopTextConfig & {
        extraText?: PopTextConfig;
        extra?: {
          showCount: string[];
          text?: string;
          style?: import('react').CSSProperties;
        };
      };
    prizeImage?: BasePopItem & PopTextConfig;
    title?: BasePopItem & PopTextConfig;
    button?: IPopButton[];
    type?: string;
    order?: number;
  }
  interface PopV1 {
    isPopupV2?: false;
    luck: TMainPagePopup;
    regret: TMainPagePopup;
    unlock: TMainPagePopup;
    continuous: TMainPagePopup;
    round: TMainPagePopup;
  }
  interface PopV2 {
    isPopupV2: true;
    luck: IPopV2Config;
    regret?: IPopV2Config;
    unlock?: IPopV2Config;
    continuous?: IPopV2Config;
    round?: IPopV2Config;
  }
  type IMainPage = BaseMainPage & (PopV1 | PopV2);
  type IMainPageWithPopV2 = BaseMainPage & PopV2;

  // =====================
  // 中奖成功页元素：
  type TLuckPageElement = 'coupon-use' | 'scan' | 'rule' | 'records' | 'tips' | 'share';

  // 导航栏
  interface INavigateBar {
    title: string;
    titleProps?: {
      style?: import('react').CSSProperties;
    };
  }

  /**
   * 中奖成功页
   */
  type ILuckPage = IPageConfig<TLuckPageElement> & {
    banner?: IBannerType[];
    // 展示形式： normal: 正常页面展示，
    form?: 'normal' | 'records';
    // records: 中奖记录展示的弹窗
    records?: IReacordPopup;
    navigateBar?: INavigateBar;
  };
  // =====================
  type TRegretElement = 'back' | 'scan' | 'rule' | 'records' | 'tips' | 'share' | 'footerRecords';
  /**
   * 中奖失败页
   */
  type IRegretPage = IPageConfig<TRegretElement> & {
    banner?: IBannerType | IBannerType[];
    navigateBar?: INavigateBar;
  };
  // =====================
  type TNearbyElement = 'scan' | 'rule' | 'records';
  /**
   * 附近门店页
   */
  interface INearbyBanner {
    size: [number, number];
    background: ImageUrl;
    transform?: ITransform;

    style?: import('react').CSSProperties;
  }

  type INearbyPage = IPageConfig<TNearbyElement> & {
    /**
     * 如果 isStatic 为 true，表明是静态页面，不处理授权、接口请求等逻辑。
     * @since 2024-08-28
     * @see 2024-08-28
     * @link https://www.teambition.com/task/66c6e8ddb722e4897a62cfef
     */
    isStatic?: boolean;
    banner?: INearbyBanner | INearbyBanner[];
    pocList: {
      style?: import('react').CSSProperties;
      anchorPosition?: number;
      title?: IButton;
      border?: {
        background?: ImageUrl;
        style?: import('react').CSSProperties;
      };
      icon?: {
        color: string;
        text?: {
          color: string;
        };
      };
    };
  };
  // =====================
  type TCouponChooseElement = '';
  /**
   * 优惠券选择页
   */
  type ICouponChoosePage = IPageConfig<TCouponChooseElement> & {};
  // =====================
  type TCouponUseElement = 'back' | 'rule' | 'records' | 'tips' | 'coupon-use';
  type TFailedElement = 'back' | 'rule' | 'records' | 'tips' | 'coupon-use' | 'share' | 'footerRecords';
  /**
   * 优惠券领取页
   */
  type ICouponUsePage = IPageConfig<TCouponUseElement> & {
    banner?: IBannerType[];
  };

  type IFailedPage = IPageConfig<TFailedElement> & {
    banner?: IBannerType[];
  };
}
