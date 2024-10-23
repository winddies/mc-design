# mc-address



## Props

| 属性 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | ----------- | ---- | ---- | ---- |
| defaultTip | 未获得地理位置时的默认提示语 | string  | No  | --
| prerequisite | 先决条件 | "privacy"  | No  | --
| preventAutoAuthorize | 是否要阻止向用户索要地理位置权限 | boolean  | No  | --
| onLocationAuthDenied | 获取地理位置授权信息为被拒绝时触发 | () => void  | No  | --
| onLocationAuthFailed | 获取地理位置授权信息失败时触发 | () => void  | No  | --
