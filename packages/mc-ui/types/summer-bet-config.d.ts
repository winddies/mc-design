declare namespace SummerBetConfig {
  type ImageUrl = `https://front-static-c.ab-inbev.cn/${string}`;

  interface IPoint {
    x: number | string;
    y: number | string;
  }

  interface ITransform {
    translate?: Partial<IPoint>; // 偏移量
    scale?: number; // 缩放比例
    rotate?: number; // 旋转角度
  }

  interface IButton extends ITransform {
    name?: string;
    text?: string;
    background?: ImageUrl;
    size?: [number, number];
  }

  interface INearbyPage {
    background?: ImageUrl;
    navigationBarMode?: 'dark' | 'light';
    logo?: {
      background: ImageUrl;
    };
    sku?: {
      background: ImageUrl;
    };
    pocList: {
      anchorPosition?: number;
      title?: IButton;
      border?: {
        background?: ImageUrl;
      };
      icon?: {
        color: string;
        text?: {
          color: string;
        };
      };
    };
  }
}
