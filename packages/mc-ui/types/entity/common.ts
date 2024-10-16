declare namespace CommonEntity {
  interface ICarousel {
    carouselItemList?: CarouselItem[];
    /**
     * code
     */
    code?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 名称
     */
    name?: string;
  }

  interface IGetLocationParams {
    /**
     * 纬度
     */
    latitude?: number;
    /**
     * 经度
     */
    longitude?: number;
  }

  interface Location {
    /**
     * 地址信息（不包含省市区名称）
     */
    address?: string;
    /**
     * 市编码
     */
    cityCode?: string;
    /**
     * 市名称
     */
    cityName?: string;
    /**
     * 区编码
     */
    districtCode?: string;
    /**
     * 区名称
     */
    districtName?: string;
    /**
     * 省份编码
     */
    provinceCode?: string;
    /**
     * 省份名称
     */
    provinceName?: string;
  }

  interface IGetCarouselInfoParams {
    /**
     * 轮播图code
     */
    code: string;
    longitude?: string;
    latitude?: string;
  }

  interface Carousel {
    carouselItemList?: CarouselItem[];
    /**
     * code
     */
    code?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 名称
     */
    name?: string;
  }

  interface CarouselItem {
    /**
     * 描述
     */
    description?: string;
    /**
     * 图片地址
     */
    imgUrl?: string;
    /**
     * 跳转类型1.小程序 2.webViewer 3.innerPage
     */
    jumpType?: import('@/constants/enum').JumpType;
    /**
     * 跳转地址
     */
    jumpUrl?: string;
  }
  interface HomeAdvertiseInfoParams {
    activityCode?: string;
    // 广告code
    code: string;
    // 纬度
    latitude?: number;
    longitude?: number;
  }
  interface HomeAdvertiseInfoResponse {
    advertiseInfoDTOList: AdvertiseInfoResponse[] | undefined;
    code?: string;
    data: AdList[];
    message: string;
    timestamp: string;
  }
  interface AdList {
    advertiseInfoDTOList: AdvertiseInfoResponse[];
    extra: any;
  }
  interface AdvertiseInfoResponse {
    code: string;
    // 名称
    name: string;

    displayConfig?: string;
    // 图片地址
    imgUrl?: string;
    // 跳转类型1.小程序 2.webViewer 3.innerPage
    jumpType?: number;
    // 跳转地址
    jumpUrl?: string;
  }
}
